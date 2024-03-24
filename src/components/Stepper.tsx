import { useState, useRef, useEffect } from "react";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";
import { ProductService } from "../services/product.service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { SelectButton } from "primereact/selectbutton";

export default function InteractiveDemo() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const items: MenuItem[] = [
    {
      label: "Table",
      command: (event) => {
        toast.current?.show({
          severity: "info",
          summary: "First Step",
          detail: event.item.label,
        });
      },
    },
    {
      label: "Chart",
      command: (event) => {
        toast.current?.show({
          severity: "info",
          summary: "Second Step",
          detail: event.item.label,
        });
      },
    },
    {
      label: "Form",
      command: (event) => {
        toast.current?.show({
          severity: "info",
          summary: "Third Step",
          detail: event.item.label,
        });
      },
    },
  ];

  return (
    <div className="card">
      <Toast ref={toast}></Toast>
      <Steps
        model={items}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
      />
      {activeIndex === 0 && <Table />}

      {activeIndex === 1 && <PrimeChart />}

      {activeIndex === 2 && <Form />}
    </div>
  );
}

function Table() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}

function PrimeChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary",
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "line",
          label: "Dataset 1",
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: "bar",
          label: "Dataset 2",
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: "white",
          borderWidth: 2,
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} height="400" />
    </div>
  );
}

function Form() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectValue, setSelectValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  const [dateRange, setDateRange] = useState<any>(null);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 600, display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: "center" }}>
        <div style={{ width: "40%" }}>
          <label htmlFor="firstname">First Name</label>
          <InputText id="firstname" style={{ width: "100%" }} />
        </div>

        <div style={{ width: "40%" }}>
          <label htmlFor="lastname">Last Name</label>
          <InputText id="lastname" style={{ width: "100%" }} />
        </div>

        <div style={{ width: "40%" }}>
          <label htmlFor="dropdown-select">Select a city</label>
          <Dropdown
            id="dropdown-select"
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ width: "40%" }}>
          <label htmlFor="date" className="font-bold block mb-2">
            Date Picker
          </label>
          <Calendar
            id="date"
            showIcon
            value={date}
            onChange={(e) => setDate(e.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ width: "40%" }}>
          <label htmlFor="calendar-timeonly" className="font-bold block mb-2">
            Time Picker
          </label>
          <Calendar
            id="calendar-timeonly"
            timeOnly
            value={time}
            onChange={(e) => setTime(e.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ width: "40%" }}>
          <label htmlFor="date-range" className="font-bold block mb-2">
            Time Picker
          </label>
          <Calendar
            id="date-range"
            selectionMode="range"
            hideOnRangeSelection
            value={dateRange}
            onChange={(e) => setDateRange(e.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ width: "40%" }}>
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
              onChange={onIngredientsChange}
              checked={ingredients.includes("Cheese")}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Cheese
            </label>
          </div>
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient2"
              name="pizza"
              value="Mushroom"
              onChange={onIngredientsChange}
              checked={ingredients.includes("Mushroom")}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Mushroom
            </label>
          </div>
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient3"
              name="pizza"
              value="Pepper"
              onChange={onIngredientsChange}
              checked={ingredients.includes("Pepper")}
            />
            <label htmlFor="ingredient3" className="ml-2">
              Pepper
            </label>
          </div>
          <div className="flex align-items-center">
            <Checkbox
              inputId="ingredient4"
              name="pizza"
              value="Onion"
              onChange={onIngredientsChange}
              checked={ingredients.includes("Onion")}
            />
            <label htmlFor="ingredient4" className="ml-2">
              Onion
            </label>
          </div>
        </div>

        <div style={{ width: "40%" }}>
          <div className="flex align-items-center">
            <RadioButton
              inputId="radio1"
              name="pizza"
              value="Cheese"
              onChange={(e) => setIngredient(e.value)}
              checked={ingredient === "Cheese"}
            />
            <label htmlFor="radio1" className="ml-2">
              Cheese
            </label>
          </div>
          <div className="flex align-items-center">
            <RadioButton
              inputId="radio2"
              name="pizza"
              value="Mushroom"
              onChange={(e) => setIngredient(e.value)}
              checked={ingredient === "Mushroom"}
            />
            <label htmlFor="radio2" className="ml-2">
              Mushroom
            </label>
          </div>
          <div className="flex align-items-center">
            <RadioButton
              inputId="radio3"
              name="pizza"
              value="Pepper"
              onChange={(e) => setIngredient(e.value)}
              checked={ingredient === "Pepper"}
            />
            <label htmlFor="radio3" className="ml-2">
              Pepper
            </label>
          </div>
          <div className="flex align-items-center">
            <RadioButton
              inputId="radio4"
              name="pizza"
              value="Onion"
              onChange={(e) => setIngredient(e.value)}
              checked={ingredient === "Onion"}
            />
            <label htmlFor="radio4" className="ml-2">
              Onion
            </label>
          </div>
        </div>

        <div style={{ width: "40%" }}>
          <Slider
            value={sliderValue}
            onChange={(e) => setSliderValue(e.value as number)}
            className="w-14rem"
          />
        </div>

        <div style={{ width: "40%" }}>
          <label htmlFor="item">Engine State</label>
          <SelectButton
            id="item"
            name="item"
            value={selectValue}
            options={["On", "Off"]}
            onChange={(e) => {
              setSelectValue(e.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
