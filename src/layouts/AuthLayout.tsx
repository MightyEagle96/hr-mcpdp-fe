import React from "react";

function AuthLayout() {
  return (
    <div>
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-red-100/40 blur-[180px]" />
    </div>
  );
}

export default AuthLayout;
