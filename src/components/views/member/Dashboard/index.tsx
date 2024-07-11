import MemberLayout from "@/components/layouts/MemberLayout";

const DashboardMemberView = ({ title }: any) => {
  return (
    <MemberLayout>
      <div>
        <div>{title || "member"}</div>
      </div>
    </MemberLayout>
  );
};

export default DashboardMemberView;
