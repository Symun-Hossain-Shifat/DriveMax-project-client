"use client";

import React, { useState } from "react";
import { useApp, Vehicle } from "./AppContext";
import { 
  Car, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Gauge, 
  HelpCircle,
  Sparkles
} from "./Icons";

export default function GarageTool() {
  const { garage, addVehicle, removeVehicle, activeVehicle, setActiveVehicle } = useApp();
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [vehicleType, setVehicleType] = useState<"Car" | "Bike">("Car");
  const [year, setYear] = useState("2024");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const carOptions = {
    Toyota: ["Supra", "GR Yaris", "Camry"],
    Honda: ["Civic Type R", "Accord", "NSX"],
    BMW: ["M4 GTS", "M5 Competition", "i8"],
    Ford: ["Mustang Shelby", "F-150 Raptor", "Focus RS"]
  };

  const bikeOptions = {
    Yamaha: ["YZF-R1", "MT-09", "YZF-R6"],
    Kawasaki: ["Ninja H2", "ZX-10R", "Ninja 400"],
    Ducati: ["Panigale V4 S", "Monster 1200", "Multistrada V4"],
    Suzuki: ["Hayabusa GSX1300R", "GSX-R1000", "V-Strom 1050"]
  };

  const makes = vehicleType === "Car" ? Object.keys(carOptions) : Object.keys(bikeOptions);
  const models = make 
    ? vehicleType === "Car"
      ? carOptions[make as keyof typeof carOptions]
      : bikeOptions[make as keyof typeof bikeOptions]
    : [];

  const handleTypeChange = (type: "Car" | "Bike") => {
    setVehicleType(type);
    setMake("");
    setModel("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model) {
      setErrorMsg("Please choose both Make and Model.");
      return;
    }
    setErrorMsg("");
    addVehicle({ year, make, model, type: vehicleType });
    setIsAdding(false);
    setMake("");
    setModel("");
  };

  return (
    <section id="garage" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900 border-b border-zinc-950 relative overflow-hidden">
      
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-orange-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-black tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full uppercase">
              Smart Filtering
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              My Garage & Fitment
            </h2>
            <p className="mt-3.5 text-zinc-400 text-sm leading-relaxed">
              Add your vehicles to review matching components instantly. Active vehicle sets fitment labels across the catalog.
            </p>
          </div>

          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-orange-500/5 active:scale-95 self-start cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              ADD NEW VEHICLE
            </button>
          )}
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* List of Vehicles (Takes 2 Cols if Form is closed) */}
          <div className={`lg:col-span-2 space-y-4`}>
            {garage.length === 0 ? (
              <div className="bg-zinc-950/60 border border-zinc-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
                <HelpCircle className="w-10 h-10 text-zinc-600 mb-3" />
                <h4 className="font-bold text-zinc-300">Your Garage is Empty</h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                  Add your car or motorcycle details to instantly filter parts compatible with your ride.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {garage.map((veh) => {
                  const isActive = activeVehicle?.id === veh.id;

                  return (
                    <div
                      key={veh.id}
                      onClick={() => setActiveVehicle(isActive ? null : veh)}
                      className={`group border rounded-2xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                        isActive
                          ? "bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/5"
                          : "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950/80"
                      }`}
                    >
                      {/* Left color glow strip */}
                      <div className={`absolute top-0 bottom-0 left-0 w-1 transition-opacity ${
                        isActive ? "bg-amber-500 opacity-100" : "bg-zinc-700 opacity-30 group-hover:opacity-75"
                      }`} />

                      <div>
                        {/* Vehicle Header info */}
                        <div className="flex justify-between items-start mb-3 pl-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            isActive ? "bg-amber-500 text-black font-extrabold" : "bg-zinc-900 text-zinc-400"
                          }`}>
                            <Car className="w-3 h-3" />
                            {veh.type}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVehicle(veh.id);
                            }}
                            className="p-1.5 text-zinc-500 hover:text-rose-400 bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-lg transition-colors cursor-pointer"
                            title="Remove Vehicle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Title details */}
                        <div className="pl-2">
                          <h4 className="text-base font-extrabold text-white">
                            {veh.year} {veh.make}
                          </h4>
                          <p className="text-zinc-400 text-xs mt-0.5">
                            Model: {veh.model}
                          </p>
                        </div>
                      </div>

                      {/* Select indicator */}
                      <div className="mt-4 pt-3 border-t border-zinc-900/60 pl-2 flex items-center justify-between">
                        {isActive ? (
                          <span className="text-[10px] font-extrabold text-amber-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            ACTIVE FILTER
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300">
                            Click to select fitment
                          </span>
                        )}
                        
                        <span className="text-[10px] text-zinc-600 font-bold uppercase">
                          ID: {veh.id}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add Form Panel */}
          {isAdding && (
            <div className="bg-zinc-950/80 border border-zinc-800/80 p-6 rounded-3xl relative overflow-hidden shadow-xl animate-in slide-in-from-right-5 duration-300">
              
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black tracking-widest text-zinc-400 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Add Vehicle
                </span>
                <button
                  onClick={() => setIsAdding(false)}
                  className="text-xs font-bold text-zinc-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Type toggle */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-2">Machine Type</label>
                  <div className="flex bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => handleTypeChange("Car")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                        vehicleType === "Car" ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Passenger Car
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange("Bike")}
                      className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer ${
                        vehicleType === "Bike" ? "bg-amber-500 text-black" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Motorcycle
                    </button>
                  </div>
                </div>

                {/* Year Selection */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">Model Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"].map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                {/* Make selection */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">Vehicle Make</label>
                  <select
                    value={make}
                    onChange={(e) => {
                      setMake(e.target.value);
                      setModel("");
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="">Select Make</option>
                    {makes.map((mk) => (
                      <option key={mk} value={mk}>{mk}</option>
                    ))}
                  </select>
                </div>

                {/* Model selection */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">Model Variant</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!make}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 px-3 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="">Select Model</option>
                    {models.map((md) => (
                      <option key={md} value={md}>{md}</option>
                    ))}
                  </select>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-extrabold py-3 rounded-lg text-xs tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                >
                  CONFIRM FITMENT DETAILS
                </button>

              </form>

            </div>
          )}

          {/* Quick Informational Guide if Form is closed */}
          {!isAdding && (
            <div className="bg-zinc-950/40 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-500" />
                  Why register my vehicle?
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed space-y-2">
                  <span>
                    When a vehicle is set as the active filter, our catalog compares the product’s compatible list.
                  </span>
                  <br />
                  <br />
                  <span>
                    Products that fit display a green check badge; non-compatible items will show a neutral label so you avoid ordering wrong threads or chassis mounts.
                  </span>
                </p>
              </div>

              <div className="mt-6 border-t border-zinc-800/80 pt-4 flex items-center gap-2.5 text-xs text-zinc-500">
                <AlertTriangle className="w-4 h-4 text-amber-500/70" />
                <span>Double-check variant details for accuracy.</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
