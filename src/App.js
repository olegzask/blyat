import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./routes/home/Home";
import Sales from "./routes/sales/Sales";
import Automotivetint from "./routes/autotint/Automotivetint";
import Dealerprogram from "./routes/dealer program/Deaelerprogram"
// import AboutUs from "./routes/about/AboutUs";
import Careers from "./routes/careers/Careers";
import ContactUs from "./routes/contact/ContactUs";
import Services from "./routes/services/Services";
import RemoteStart from "./routes/remotestart/RemoteStart";
import PaintProtection from "./routes/paintprotection/PaintProtection";
import Dashcams from "./routes/dashcams/Dashcams";
import InfoCard from "./components/moreinfo/InfoCard";
import { Simulator } from "./components/simulator/simulator";
import Accessories from "./routes/12voltaccessories/Accessories";
import Marine from "./routes/marine/Marine";
import PpfPacks from "./routes/car audio-video/CarAudio";
import { Dealer } from "./routes/dealer/Dealer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="sales" element={<Sales />} />
        {/* <Route path="about" element={<AboutUs />} /> */}
        <Route path="services" element={<Services />} />
        <Route path="services/window-tint" element={<Automotivetint />} />
        <Route path="services/dealer-program" element={<Dealerprogram />} />
        <Route path="services/dealer-program/pricelist" element={<Dealer />} />

        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="simulator" element={<Simulator />} />
        <Route path="services/remote-start" element={<RemoteStart />} />
        <Route
          path="services/paint-protection-film"
          element={<PaintProtection />}
        />
        <Route path="services/dash-cams" element={<Dashcams />} />
        <Route path="services/12-volt-accessories" element={<Accessories />} />
        <Route path="services/marine-audio" element={<Marine />} />
        <Route path="services/paint-protection-film/packages" element={<PpfPacks/>} />

        <Route path="services/:service/:id" element={<InfoCard />} />
      </Route>
    </Routes>
  );
};

export default App;
