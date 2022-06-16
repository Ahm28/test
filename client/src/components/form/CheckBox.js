import React, { createElement } from "react";

export default function CheckBox({
  value,
  handleChangeCategoryId,
  categoryId,
}) {
  const [isChecked, setIsChecked] = React.useState();

  const getIsChecked = () => {
    if (categoryId?.length != 0) {
      categoryId?.every((item) => {
        if (item == value) {
          setIsChecked(true);
          return false;
        } else {
          setIsChecked(false);
          return true;
        }
      });
    } else {
      setIsChecked(false);
    }
  };

  React.useEffect(() => {
    getIsChecked();
  }, [categoryId]);

  return createElement("input", {
    type: "checkbox",
    checked: isChecked,
    value: value,
    onClick: handleChangeCategoryId,
  });
}
