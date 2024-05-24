import React from "react";
import { View, Text } from "react-native";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Option,
  Select,
} from "@mui/joy";
import useForm from "../hooks/useForm";

export default function Form() {
  const { state, onChange, validation, onSubmit, showAlert } = useForm();

  return (
    <>
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          marginTop: 250,
          alignItems: "center",
        }}
      >
        <View style={{ gap: 10, width: "auto", minWidth: "50%" }}>
          <FormControl style={{ flexDirection: "row", width: "100%", gap: 10 }}>
            <Text
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                width: 120,
                textAlign: "right",
              }}
            >
              Account Type:
            </Text>
            <Select
              placeholder="Choose"
              sx={{
                "&.MuiSelect-indicator .Mui-expanded svg": {
                  color: "white",
                },
                flex: 1,
              }}
              size="sm"
              defaultValue={"Manual"}
              value={state.accountType}
              onChange={(_, val) => {
                onChange("accountType", val as string);
              }}
            >
              <Option value="Advanced">Advanced</Option>
              <Option value="Manual">Manual</Option>
            </Select>
          </FormControl>
          <FormControl style={{ flexDirection: "row", width: "100%", gap: 10 }}>
            <Text
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                width: 120,
                textAlign: "right",
              }}
            >
              User Name:
            </Text>
            <Input
              placeholder="name@example.com"
              style={{ flex: 1 }}
              variant="outlined"
              required
              type="email"
              value={state.userName}
              onChange={(e) => onChange("userName", e.target.value)}
              size="sm"
              error={!validation.userName}
            />
          </FormControl>
          <FormControl style={{ flexDirection: "row", width: "100%", gap: 10 }}>
            <Text
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                width: 120,
                textAlign: "right",
              }}
            >
              Password:
            </Text>
            {/* <FormLabel
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: 10,
            }}
          >
            Password:
          </FormLabel> */}
            <Input
              placeholder="Required"
              style={{ flex: 1 }}
              type="password"
              variant="outlined"
              onChange={(e) => onChange("password", e.target.value)}
              value={state.password}
              error={!validation.password}
              size="sm"
            />
          </FormControl>
          {state.accountType === "Advanced" && (
            <>
              <FormControl
                style={{ flexDirection: "row", width: "100%", gap: 10 }}
              >
                <Text
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: 120,
                    textAlign: "right",
                  }}
                >
                  Server Address:
                </Text>
                <Input
                  placeholder="example.com"
                  style={{ flex: 1 }}
                  variant="outlined"
                  size="sm"
                  error={!validation.serverAddress}
                  onChange={(e) => onChange("serverAddress", e.target.value)}
                  value={state.serverAddress}
                />
              </FormControl>
              <FormControl
                style={{ flexDirection: "row", width: "100%", gap: 10 }}
              >
                <Text
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: 120,
                    textAlign: "right",
                  }}
                >
                  Server Path:
                </Text>
                <Input
                  placeholder="test 123"
                  style={{ flex: 1 }}
                  variant="outlined"
                  size="sm"
                  error={!validation.serverPath}
                  onChange={(e) => onChange("serverPath", e.target.value)}
                  value={state.serverPath}
                />
              </FormControl>
              <FormControl
                style={{ flexDirection: "row", width: "100%", gap: 10 }}
              >
                <Text
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: 120,
                    textAlign: "right",
                  }}
                >
                  Port
                </Text>
                <Input
                  placeholder="test 123"
                  style={{ flex: 1 }}
                  variant="outlined"
                  size="sm"
                  type="number"
                  error={!validation.port}
                  slotProps={{
                    input: {
                      min: 0,
                      max: 65535,
                    },
                  }}
                  onChange={(e) => onChange("port", e.target.value)}
                  value={state.port}
                />
                <FormControl
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                >
                  <Checkbox
                    sx={{ alignItems: "center" }}
                    label="Use SSL"
                    checked={state.useSsl}
                    onChange={() => onChange("useSsl", !state.useSsl)}
                  />
                </FormControl>
              </FormControl>
            </>
          )}
          <Button
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            Submit
          </Button>
        </View>
      </View>

      {showAlert && (
        <View style={{ position: "absolute", top: 50 }}>
          <Alert variant="solid" sx={{ wordBreak: "break-all" }}>
            {JSON.stringify(state)}
          </Alert>
        </View>
      )}
    </>
  );
}
