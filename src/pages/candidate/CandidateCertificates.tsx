import { useEffect, useState } from "react";
import CandidateCertificates from "./CandidateCertificatesProps";
import { httpService } from "../../httpService";

function Certificates() {
  const [moduleProgress, setModuleProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await httpService(
        "moduleprogress/get_module_progress/me",
      );

      setModuleProgress(data);
      console.log(data);
    } catch (error) {
      // toastError
    }
    setLoading(false);
  };

  const onGenerateCertificate = (params: any) => {
    console.log(params);
  };

  const onViewCertificate = () => {};

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {" "}
      <CandidateCertificates
        moduleProgress={moduleProgress}
        onGenerateCertificate={onGenerateCertificate}
        onViewCertificate={onViewCertificate}
        loading={loading}
      />
    </div>
  );
}

export default Certificates;
