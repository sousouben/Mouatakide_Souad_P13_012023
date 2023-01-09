import React from "react";
import Banner from "../../components/banner/Banner";
import FeaturesChat from "../../components/features/FeaturesChat";
import FeaturesMoney from "../../components/features/FeaturesMoney";
import FeaturesSecurity from "../../components/features/FeaturesSecurity";

const Home = () => {
  return (
    <div className="pageContainer">
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeaturesChat />
        <FeaturesMoney />
        <FeaturesSecurity />
      </section>
    </div>
  );
};

export default Home;
