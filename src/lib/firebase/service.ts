import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  addDoc,
  where,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "./init";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firestore = getFirestore(app);

const storage = getStorage(app);

export async function getCollection(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  return snapshot.data();
}

export async function retrieveData(collectionName: string) {
  const q = query(collection(firestore, collectionName));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function addData(
  collectionName: string,
  data: any,
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function uploadFile(
  userid: string,
  file: any,
  callback: Function
) {
  if (file && file.size < 1048576) {
    console.log("ikan", file);
    const newName = `userid_profile.${file.name.split(".")[1]}`;
    const storageRef = ref(storage, `images/users/${userid}/${newName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 10;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
          callback(true, downloadURL);
        });
      }
    );
  }

  return callback(true);
}
