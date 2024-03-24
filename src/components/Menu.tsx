import { Avatar } from "primereact/avatar";
import { MenuItem } from "primereact/menuitem";
import { Menubar } from "primereact/menubar";

export default function Menu() {
  const items: MenuItem[] = [
    {
      label: "Cafe",
      items: [
        { label: "Radar", url: "/" },
        { label: "Focus View" },
        { label: "Reports" },
      ],
    },
    {
      label: "Radar",
    },
    {
      label: "Focus View",
    },
    {
      label: "Reports",
      items: [
        { label: "Production" },
        { label: "Consistency" },
        { label: "Brew compare" },
      ],
    },
  ];

  const icon = (
    <div style={{ marginInline: 8 }}>
      <img src="CropsterIconOnly.svg" alt="logo" />
    </div>
  );

  const avatar = (
    <Avatar
      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
      shape="circle"
    />
  );

  return (
    <div className="card">
      <Menubar model={items} start={icon} end={avatar} />
    </div>
  );
}
