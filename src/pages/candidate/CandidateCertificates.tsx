import { useEffect, useState } from "react";
import CandidateCertificates from "./CandidateCertificatesProps";
import { httpService } from "../../httpService";
import { toast } from "sonner";
import { toastError } from "../../components/CustomToast";

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

  const onGenerateCertificate = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await httpService.get(
        `moduleprogress/generate_certificate/${params}`,
      );
      toast.success(data);
    } catch (error) {
      toastError(error);
    }
    setLoading(false);
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
