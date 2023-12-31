import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RadioButtons } from "./radio-buttons";
import LinkComponent from "../link/LinkComponent";
import { tintShades } from "./tint-data";
import { tintPartsSedan, tintPartsTruck, tintPartsSuv } from "./tintParts";

import "./simulator-tint.styles.css";

const tintPrices = {
  car: { fronts: 100, rears: 100, rearws: 100, wsbrow: 80 },
  suv: { fronts: 100, rears: 150, rearws: 100, wsbrow: 80 },
  truck: { fronts: 100, rears: 100, rearws: 100, wsbrow: 80 },
};

export const SimulatorTint = () => {
  const [linked, setLinked] = useState(tintPartsSedan);
  const [frontglass, setFrontGlass] = useState();
  const [rearsideglass, setRearSideGlass] = useState();
  const [rearwindshield, setRearWindshield] = useState();
  const [windshieldbrow, setWindshieldBrow] = useState();
  const [price, setPrice] = useState({
    frontglass: 0,
    rearsideglass: 0,
    rearwindshield: 0,
    windshieldbrow: 0,
  });
  const [vehicle, setVehicle] = useState("car");
  const [selectedParts, setSelectedParts] = useState([]);
  const totalPrice = Object.values(price).reduce(
    (prevValue, curValue) => prevValue + curValue,
    0
  );

  const clearShade = (event) => {
    const selectedDiv = event.target.closest(".glass-container");
    const selectedId = selectedDiv.id;

    const hideImg = document.getElementById(`${selectedId}-tint`);
    hideImg.style.opacity = 0;

    setSelectedParts(selectedParts.map((el) => el != selectedId + ""));

    setPrice({
      ...price,
      [selectedId]: 0,
    });
  };

  const whatVehicle = () => {
    if (vehicle === "car") return tintPrices.car;
    if (vehicle === "truck") return tintPrices.truck;
    if (vehicle === "suv") return tintPrices.suv;
  };

  useEffect(() => {
    selectedParts.map((el) => {
      const name = el + "";
      if (name in price && name === "frontglass")
        setPrice({
          ...price,
          [name]: whatVehicle().fronts,
        });
      if (name in price && name === "rearsideglass")
        setPrice({ ...price, [name]: whatVehicle().rears });
      if (name in price && name === "rearwindshield")
        setPrice({
          ...price,
          [name]: whatVehicle().rearws,
        });
      if (name in price && name === "windshieldbrow")
        setPrice({ ...price, [name]: whatVehicle().wsbrow });
    });
  }, [selectedParts]);

  const vehicleSelector = (event) => {
    setPrice({
      frontglass: 0,
      rearsideglass: 0,
      rearwindshield: 0,
      windshieldbrow: 0,
    });
    setSelectedParts([]);
    Array.from(document.getElementsByClassName("shade-number")).map((el) =>
      el.classList.remove("shade-clicked")
    );
    const vehicleType = event.target.value;
    if (vehicleType && vehicleType === "car") {
      const gg = Array.from(document.getElementsByClassName("part-tint"));
      gg.map((el) => (el.style.opacity = 0));
      setLinked(tintPartsSedan);
      setVehicle(vehicleType.toLowerCase());
      return;
    }
    if (vehicleType && vehicleType === "truck") {
      const gg = Array.from(document.getElementsByClassName("part-tint"));
      gg.map((el) => (el.style.opacity = 0));
      setLinked(tintPartsTruck);
      setVehicle(vehicleType.toLowerCase());
      return;
    }
    if (vehicleType && vehicleType === "suv") {
      const gg = Array.from(document.getElementsByClassName("part-tint"));
      gg.map((el) => (el.style.opacity = 0));
      setLinked(tintPartsSuv);
      setVehicle(vehicleType.toLowerCase());
      return;
    }
  };

  const clicked = (event) => {
    Array.from(event.target.closest(".glass-container").children).map((num) => {
      num.classList.remove("shade-clicked");
      num.classList.add("number-inactive");
    });

    const el = event.target;
    if (event.target.classList.contains("shade-number")) {
      const id = event.target.closest(".glass-container").getAttribute("id");
      const number = +el.innerHTML; //Shade %,
      el.classList.add("shade-clicked");
      el.classList.remove("number-inactive");

      Array.from(document.getElementsByClassName(`part-${id}`)).map((el) => {
        el.classList.remove("part-active");
        el.style.opacity = 0;
      });

      const tintImg = document.getElementById(`${id}-tint`);
      tintImg.classList.add("part-active");
      tintImg.style.opacity = 1 - number / 100;

      if (!selectedParts.includes(id))
        setSelectedParts((selectedParts) => [...selectedParts, id]);

      if (id === "frontglass") setFrontGlass(number);
      if (id === "rearsideglass") setRearSideGlass(number);
      if (id === "rearwindshield") setRearWindshield(number);
      if (id === "windshieldbrow") setWindshieldBrow(number);
    }
  };

  return (
    <div className="simulator-ppf-container">
      <div className="simulator-rightside">
        <div className="images-container">
          <img
            className="simulator-ppf-img tint-img"
            src={`images/simulator-images/${vehicle}.jpg`}
            alt="vehicle-img"
          />
          {Object.entries(linked).map((el, id) => {
            const [partName, link] = el;

            return (
              <img
                key={id}
                src={link}
                id={`${partName}-tint`}
                className="part-tint"
              />
            );
          })}
        </div>
        <p className="note">
          *Please note, real-life result may look slightly different. 
        </p>
        <p className="note">
          Prices may vary, please contact us with your vehicle details for personal quote.
        </p>
        
      </div>

      <div className="opts-container">
        <div className="radio-buttons-container">
          <RadioButtons options={{ vehicleSelector }} />
        </div>
        <div className="parts-container">
          <div className="parts-opts">
            <div className="shades">
              <span className="shades-header">Front Side Glass</span>
              <div
                onClick={clicked}
                className="glass-container"
                id="frontglass"
                value={frontglass}
              >
                {tintShades.map((shade, id) => {
                  return (
                    <span
                      key={id}
                      className="shade-number front-side number-inactive"
                    >
                      {shade}
                    </span>
                  );
                })}
                <span onClick={clearShade} className="del-btn-tint">
                  {" "}
                  <MdDeleteForever />
                </span>
              </div>
            </div>
            <div className="shades">
              <span className="shades-header">Rear Side Glass</span>
              <div
                onClick={clicked}
                className="glass-container"
                id="rearsideglass"
              >
                {tintShades.map((shade, id) => {
                  return (
                    <span key={id} className="shade-number number-inactive">
                      {shade}
                    </span>
                  );
                })}
                <span onClick={clearShade} className="del-btn-tint">
                  {" "}
                  <MdDeleteForever />
                </span>
              </div>
            </div>{" "}
            <div className="shades">
              <span className="shades-header">Rear Windshield</span>
              <div
                onClick={clicked}
                className="glass-container"
                id="rearwindshield"
              >
                {tintShades.map((shade, id) => {
                  return (
                    <span key={id} className="shade-number number-inactive">
                      {shade}
                    </span>
                  );
                })}
                <span onClick={clearShade} className="del-btn-tint">
                  {" "}
                  <MdDeleteForever />
                </span>
              </div>
            </div>{" "}
            <div className="shades">
              <span className="shades-header">Windshield Brow</span>
              <div
                onClick={clicked}
                className="glass-container"
                id="windshieldbrow"
              >
                {tintShades.map((shade, id) => {
                  return (
                    <span key={id} className="shade-number number-inactive">
                      {shade}
                    </span>
                  );
                })}
                <span onClick={clearShade} className="del-btn-tint">
                  {" "}
                  <MdDeleteForever />
                </span>
              </div>
            </div>
          </div>
          <div className="price-tint">
            <span className="price-total">{`Estimated Price: $${totalPrice}`}</span>
            {/* <LinkComponent
              opts={{
                name: "CONTACT US",
                linkTo: "contact",
                clName: "btn-sim",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
