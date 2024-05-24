import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

type StateType = string | number | boolean;

export default function useForm() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/form/formData`)
      .then((res) => {
        if (checkValidation(res.data)) setState(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [state, setState] = useState({
    accountType: "Manual",
    userName: "",
    password: "",
    serverAddress: "",
    serverPath: "",
    port: 0,
    useSsl: false,
  });

  const [validation, setValidation] = useState({
    accountType: false,
    serverAddress: false,
    password: false,
    userName: false,
    serverPath: false,
    port: false,
    useSsl: true,
  });

  useEffect(() => {
    if (state) {
      for (const key of Object.keys(
        validation
      ) as (keyof typeof validation)[]) {
        const keyName: keyof typeof state = key as keyof typeof state;
        setValidation((prev) => ({
          ...prev,
          [keyName]: validateState(keyName, state[keyName]),
        }));
      }
    }
  }, [state]);

  const onChange = (name: keyof typeof state, value: StateType) => {
    setValidation((prev) => ({
      ...prev,
      [name]: validateState(name, value),
    }));

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const validateState = (name: keyof typeof state, value: StateType) => {
    switch (name) {
      case "serverAddress": {
        const hostPattern =
          /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|:(?::[0-9a-fA-F]{1,4}){1,7}|::)|((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{1,63}(?<!-)))$/;
        return (
          state.accountType === "Manual" || hostPattern.test(value as string)
        );
      }
      case "userName": {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(value as string);
      }
      case "password": {
        return (value as string).trim().length > 0;
      }
      case "serverPath": {
        const pattern = /^[a-zA-Z0-9/]+$/;
        return state.accountType === "Manual" || pattern.test(value as string);
      }
      case "port": {
        const val = value as number;
        return state.accountType === "Manual" || (val <= 65535 && val >= 0);
      }
      case "accountType": {
        return value === "Advanced" || value === "Manual";
      }
      case "useSsl": {
        return true; // this is optional so no need to validate
      }
    }
  };

  const allValidated = () => {
    let key: keyof typeof validation;
    for (key of Object.keys(validation) as (keyof typeof validation)[]) {
      if (!validation[key]) {
        console.log(state[key], key, validation[key]);
        return false;
      }
    }
    return true;
  };

  const checkValidation = (value?: typeof state) => {
    const data = value || state;
    for (const name of Object.keys(data)) {
      const keyName: keyof typeof state = name as keyof typeof state;
      if (!validateState(keyName, data[keyName])) return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (allValidated()) {
      axios.post(`${API_BASE_URL}/form/formData`, {
        ...state,
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      checkValidation();
    }
  };

  return {
    state,
    onChange,
    validateState,
    validation,
    onSubmit,
    showAlert,
  };
}
