import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" text-white">
      <div className="container mx-auto min-h-[150px] bg-sky-600 p-4 gap-2">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              Infinisoft Solutions Sole Co., Ltd.
            </h2>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Address</h2>
            <p>Thongkhankham building , 1-4th floors , thongkhankham road , thongkhankham village chanthabuly District, Vientiane Capital, Lao P.D.R</p>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Contact</h2>
            <ul>
              <li>
                <FaPhone className="inline" /> (+856)20 58289955
              </li>
              <li>
                <MdOutlineAlternateEmail className="inline" />{" "}
                souksawat@infinisoft.info
              </li>
              <li>
                <FaWhatsapp className="inline" /> (+856)20 77898984
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-sky-800 p-4">
        <p>&copy; 2023 Infinisoft. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
