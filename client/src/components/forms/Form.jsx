/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const Form = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const renderComponent = (getControlerItem) => {
    let element = null;
    const value = formData[getControlerItem?.name] || "";
    switch (getControlerItem?.componentType) {
      case "input":
        element = (
          <Input
            name={getControlerItem?.name}
            placeholder={getControlerItem?.placeholder}
            id={getControlerItem?.name}
            type={getControlerItem?.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlerItem?.name]: event?.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(selectedValue) =>
              setFormData({
                ...formData,
                [getControlerItem?.name]: selectedValue,
              })
            }
          >
            <SelectTrigger className=" w-full">
              <SelectValue placeholder={getControlerItem?.placeholder} /> 
              {/* label */}
            </SelectTrigger>
            <SelectContent>
              {getControlerItem?.options && getControlerItem?.options.length > 0
                ? getControlerItem?.options.map((optionItem) => (
                    <SelectItem key={optionItem?.id} value={optionItem?.id}>
                      {optionItem?.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            value={value}
            placeholder={getControlerItem?.placeholder}
            name={getControlerItem?.name}
            id={getControlerItem?.id}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlerItem?.name]: event?.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlerItem?.name}
            placeholder={getControlerItem?.placeholder}
            id={getControlerItem?.name}
            type={getControlerItem?.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlerItem?.name]: event?.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls?.map((controlItem) => (
          <div className="grid w-full gap-2" key={controlItem?.name}>
            <Label className="mb-1">{controlItem?.label}</Label>
            {renderComponent(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}{" "}
      </Button>
    </form>
  );
};

export default Form;
