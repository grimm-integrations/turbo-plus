import chalk from "chalk";
import {
  createPrompt,
  useState,
  useKeypress,
  isEnterKey,
  usePrefix,
} from "@inquirer/core";

export const confirm = createPrompt<
  boolean,
  {
    message: string;
    default?: boolean;
    validate?: (value: boolean) => boolean | string | Promise<string | boolean>;
  }
>((config, done) => {
  const { validate } = config;
  const [status, setStatus] = useState("pending");
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [value, setValue] = useState("");
  const prefix = usePrefix();

  useKeypress(async (key, rl) => {
    if (isEnterKey(key)) {
      setErrorMsg(undefined);
      const answer = value
        ? /^y(?<temp1>es)?/i.test(value)
        : config.default !== false;
      const isValid = validate ? await validate(answer) : true;
      if (isValid === true) {
        setValue(answer ? "yes" : "no");
        setStatus("done");
        done(answer);
      } else {
        // Reset the readline line value to the previous value. On line event, the value
        // get cleared, forcing the user to re-enter the value instead of fixing it.
        rl.write(value);
        setErrorMsg(isValid || "You must provide a valid value");
        setStatus("pending");
      }
    } else {
      setValue(rl.line);
    }
  });

  let formattedValue = value;
  let defaultValue = "";
  if (status === "done") {
    formattedValue = chalk.cyan(value);
  } else {
    defaultValue = chalk.dim(config.default === false ? " (y/N)" : " (Y/n)");
  }
  let error = "";
  if (errorMsg) {
    error = chalk.red(`> ${errorMsg}`);
  }

  const message = chalk.bold(config.message);
  return [`${prefix} ${message}${defaultValue} ${formattedValue}`, error];
});
