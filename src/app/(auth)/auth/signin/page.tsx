import FormLogin from "@/app/components/FormLogin";
import { Provider } from "@/app/provider/SessionProvider";
export default function Signin() {
  return (
    <div className="container mx-auto flex justify-center">
      <FormLogin />
    </div>
  );
}
