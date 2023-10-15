// Next
import Image from "next/image";

// Components
import FormCarrinho from "@/components/FormCarrinho/FormCarrinho";
import Button from "@/components/Button/Button";

//Icons
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdPhoneInTalk, MdPhonelinkRing } from "react-icons/md";

export default function Pedido() {
  const cardIcon = true;
  return (
    <>
      <Image src="/image2.png" alt={"imagem"} width={300} height={550} />
      <div className="iso">
        <div className="iso__img">
          <Image src="/iso.png" alt={"imagem"} width={100} height={100} />
        </div>
        <div className="iso__title-p">
          <p>
            Na busca pela excelência, nossos produtos conquistaram a
            certificação ISO 9001, oferecendo a tranquilidade que sua família
            merece.
          </p>
        </div>
      </div>
      <div className="products__title">
        <h1>Produtos</h1>
      </div>
      <FormCarrinho />
      <Button
        to={"/pedido/dados"}
        Icon={<AiOutlineShoppingCart />}
        text={"Avançar"}
      />
      <div className="contact">
        Duvidas?
        <div className="contact__phone">
          <MdPhonelinkRing />
          (51) 9 9992-8728
        </div>
        <div className="contact__phone">
          <MdPhoneInTalk />
          (51) 3491-5000
        </div>
      </div>
    </>
  );
}
