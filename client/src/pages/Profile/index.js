import React from "react";
import { Tabs } from "antd";
import TheatreList from "./TheatreList";
import Bookings from "./Bookings";

const Profile = () => {
  const items = [
    {
      key: "1",
      label: "Theatre List",
      children: <TheatreList />,
    },
    {
      key: "2",
      label: "Bookings",
      children: <Bookings />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Profile;
