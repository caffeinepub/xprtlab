import { r as reactExports, j as jsxRuntimeExports, R as React, T as TestError } from "./index-BcSF07MB.js";
import { B as Badge } from "./badge-D6H4sPB8.js";
import { B as Button } from "./button-wOnNUJ71.js";
import { I as Input } from "./input-BiZ8Warn.js";
import { S as Skeleton } from "./skeleton-j2Ru2Hzr.js";
import { T as useComposedRefs, Q as useControllableState, R as createContextScope, S as Primitive, U as composeEventHandlers, c as cn, $ as useAddTest, X, L as LoaderCircle, a0 as useDisableTest, a1 as useUpdateTest, I as Dialog, J as DialogContent, K as DialogHeader, M as DialogTitle, N as DialogDescription, O as DialogFooter, f as useGetAllTests, a2 as useBulkAddTests, a3 as useSetTestStatus } from "./ProfileSetupModal-DZhF98LT.js";
import { u as usePrevious, a as useSize } from "./index-BC_oSiPt.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, P as Pencil, B as Ban } from "./table-Chy094JW.js";
import { u as ue } from "./index-BPXqeWHC.js";
import { m as addDemoTestMaster, n as updateDemoTestMaster } from "./demoData-Nk0_-YUY.js";
import { C as CircleAlert } from "./circle-alert-Bf5qzqlv.js";
import { T as TriangleAlert } from "./triangle-alert-DREXHRAq.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog--_6hdaiC.js";
import { L as Label } from "./label-DzAGXiXR.js";
import { c as computeProfitPerTest, g as getProfitStatusColor } from "./profitUtils-CU3rQSve.js";
import { P as PageHeroHeader } from "./PageHeroHeader-CPzgo-wN.js";
import { T as TestTube } from "./StaffApp-4vOjvg9B.js";
import { U as Upload } from "./upload-CAZ75PVW.js";
import { P as Plus } from "./plus-Be-trJXM.js";
import { S as Search } from "./search-DHbyPuXy.js";
import { C as ChevronLeft } from "./chevron-left-BxC5P6FU.js";
import { C as ChevronRight } from "./chevron-right-DMGKFxFM.js";
import "./index-hKQIW38e.js";
import "./user-BR4Wwed5.js";
import "./clock-Bi5ilDhW.js";
import "./building-2-2WTSU1FY.js";
import "./map-pin-Ddp8nwPv.js";
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
var isCheckBoxInput = (element) => element.type === "checkbox";
var isDateObject = (value) => value instanceof Date;
var isNullOrUndefined = (value) => value == null;
const isObjectType = (value) => typeof value === "object";
var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;
var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));
var isPlainObject = (tempObject) => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
  return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
};
var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
function cloneObject(data) {
  let copy;
  const isArray = Array.isArray(data);
  const isFileListInstance = typeof FileList !== "undefined" ? data instanceof FileList : false;
  if (data instanceof Date) {
    copy = new Date(data);
  } else if (!(isWeb && (data instanceof Blob || isFileListInstance)) && (isArray || isObject(data))) {
    copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
    if (!isArray && !isPlainObject(data)) {
      copy = data;
    } else {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          copy[key] = cloneObject(data[key]);
        }
      }
    }
  } else {
    return data;
  }
  return copy;
}
var isKey = (value) => /^\w*$/.test(value);
var isUndefined = (val) => val === void 0;
var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
var stringToPath = (input) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
var get = (object, path, defaultValue) => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }
  const result = (isKey(path) ? [path] : stringToPath(path)).reduce((result2, key) => isNullOrUndefined(result2) ? result2 : result2[key], object);
  return isUndefined(result) || result === object ? isUndefined(object[path]) ? defaultValue : object[path] : result;
};
var isBoolean = (value) => typeof value === "boolean";
var set = (object, path, value) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    object[key] = newValue;
    object = object[key];
  }
};
const EVENTS = {
  BLUR: "blur",
  FOCUS_OUT: "focusout"
};
const VALIDATION_MODE = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
};
const INPUT_VALIDATION_RULES = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
};
const HookFormContext = React.createContext(null);
HookFormContext.displayName = "HookFormContext";
var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
  const result = {
    defaultValues: control._defaultValues
  };
  for (const key in formState) {
    Object.defineProperty(result, key, {
      get: () => {
        const _key = key;
        if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
          control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
        }
        return formState[_key];
      }
    });
  }
  return result;
};
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var isString = (value) => typeof value === "string";
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
  if (isString(names)) {
    isGlobal && _names.watch.add(names);
    return get(formValues, names, defaultValue);
  }
  if (Array.isArray(names)) {
    return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
  }
  isGlobal && (_names.watchAll = true);
  return formValues;
};
var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
function deepEqual(object1, object2, _internal_visited = /* @__PURE__ */ new WeakSet()) {
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return object1 === object2;
  }
  if (isDateObject(object1) && isDateObject(object2)) {
    return object1.getTime() === object2.getTime();
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  if (_internal_visited.has(object1) || _internal_visited.has(object2)) {
    return true;
  }
  _internal_visited.add(object1);
  _internal_visited.add(object2);
  for (const key of keys1) {
    const val1 = object1[key];
    if (!keys2.includes(key)) {
      return false;
    }
    if (key !== "ref") {
      const val2 = object2[key];
      if (isDateObject(val1) && isDateObject(val2) || isObject(val1) && isObject(val2) || Array.isArray(val1) && Array.isArray(val2) ? !deepEqual(val1, val2, _internal_visited) : val1 !== val2) {
        return false;
      }
    }
  }
  return true;
}
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
  ...errors[name],
  types: {
    ...errors[name] && errors[name].types ? errors[name].types : {},
    [type]: message || true
  }
} : {};
var convertToArrayPayload = (value) => Array.isArray(value) ? value : [value];
var createSubject = () => {
  let _observers = [];
  const next = (value) => {
    for (const observer of _observers) {
      observer.next && observer.next(value);
    }
  };
  const subscribe = (observer) => {
    _observers.push(observer);
    return {
      unsubscribe: () => {
        _observers = _observers.filter((o) => o !== observer);
      }
    };
  };
  const unsubscribe = () => {
    _observers = [];
  };
  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe
  };
};
function extractFormValues(fieldsState, formValues) {
  const values = {};
  for (const key in fieldsState) {
    if (fieldsState.hasOwnProperty(key)) {
      const fieldState = fieldsState[key];
      const fieldValue = formValues[key];
      if (fieldState && isObject(fieldState) && fieldValue) {
        const nestedFieldsState = extractFormValues(fieldState, fieldValue);
        if (isObject(nestedFieldsState)) {
          values[key] = nestedFieldsState;
        }
      } else if (fieldsState[key]) {
        values[key] = fieldValue;
      }
    }
  }
  return values;
}
var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;
var isFileInput = (element) => element.type === "file";
var isFunction = (value) => typeof value === "function";
var isHTMLElement = (value) => {
  if (!isWeb) {
    return false;
  }
  const owner = value ? value.ownerDocument : 0;
  return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
};
var isMultipleSelect = (element) => element.type === `select-multiple`;
var isRadioInput = (element) => element.type === "radio";
var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);
var live = (ref) => isHTMLElement(ref) && ref.isConnected;
function baseGet(object, updatePath) {
  const length = updatePath.slice(0, -1).length;
  let index = 0;
  while (index < length) {
    object = isUndefined(object) ? index++ : object[updatePath[index++]];
  }
  return object;
}
function isEmptyArray(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
      return false;
    }
  }
  return true;
}
function unset(object, path) {
  const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path);
  const childObject = paths.length === 1 ? object : baseGet(object, paths);
  const index = paths.length - 1;
  const key = paths[index];
  if (childObject) {
    delete childObject[key];
  }
  if (index !== 0 && (isObject(childObject) && isEmptyObject(childObject) || Array.isArray(childObject) && isEmptyArray(childObject))) {
    unset(object, paths.slice(0, -1));
  }
  return object;
}
var objectHasFunction = (data) => {
  for (const key in data) {
    if (isFunction(data[key])) {
      return true;
    }
  }
  return false;
};
function isTraversable(value) {
  return Array.isArray(value) || isObject(value) && !objectHasFunction(value);
}
function markFieldsDirty(data, fields = {}) {
  for (const key in data) {
    if (isTraversable(data[key])) {
      fields[key] = Array.isArray(data[key]) ? [] : {};
      markFieldsDirty(data[key], fields[key]);
    } else if (!isUndefined(data[key])) {
      fields[key] = true;
    }
  }
  return fields;
}
function getDirtyFields(data, formValues, dirtyFieldsFromValues) {
  if (!dirtyFieldsFromValues) {
    dirtyFieldsFromValues = markFieldsDirty(formValues);
  }
  for (const key in data) {
    if (isTraversable(data[key])) {
      if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
        dirtyFieldsFromValues[key] = markFieldsDirty(data[key], Array.isArray(data[key]) ? [] : {});
      } else {
        getDirtyFields(data[key], isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
      }
    } else {
      dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]);
    }
  }
  return dirtyFieldsFromValues;
}
const defaultResult = {
  value: false,
  isValid: false
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
  if (Array.isArray(options)) {
    if (options.length > 1) {
      const values = options.filter((option) => option && option.checked && !option.disabled).map((option) => option.value);
      return { value: values, isValid: !!values.length };
    }
    return options[0].checked && !options[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === "" ? validResult : { value: options[0].value, isValid: true } : validResult
    ) : defaultResult;
  }
  return defaultResult;
};
var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value) ? value : valueAsNumber ? value === "" ? NaN : value ? +value : value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
const defaultReturn = {
  isValid: false,
  value: null
};
var getRadioValue = (options) => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
  isValid: true,
  value: option.value
} : previous, defaultReturn) : defaultReturn;
function getFieldValue(_f) {
  const ref = _f.ref;
  if (isFileInput(ref)) {
    return ref.files;
  }
  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }
  if (isMultipleSelect(ref)) {
    return [...ref.selectedOptions].map(({ value }) => value);
  }
  if (isCheckBoxInput(ref)) {
    return getCheckboxValue(_f.refs).value;
  }
  return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
  const fields = {};
  for (const name of fieldsNames) {
    const field = get(_fields, name);
    field && set(fields, name, field._f);
  }
  return {
    criteriaMode,
    names: [...fieldsNames],
    fields,
    shouldUseNativeValidation
  };
};
var isRegex = (value) => value instanceof RegExp;
var getRuleValue = (rule) => isUndefined(rule) ? rule : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
var getValidationModes = (mode) => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onChange,
  isOnAll: mode === VALIDATION_MODE.all,
  isOnTouch: mode === VALIDATION_MODE.onTouched
});
const ASYNC_FUNCTION = "AsyncFunction";
var hasPromiseValidation = (fieldReference) => !!fieldReference && !!fieldReference.validate && !!(isFunction(fieldReference.validate) && fieldReference.validate.constructor.name === ASYNC_FUNCTION || isObject(fieldReference.validate) && Object.values(fieldReference.validate).find((validateFunction) => validateFunction.constructor.name === ASYNC_FUNCTION));
var hasValidation = (options) => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
var isWatched = (name, _names, isBlurEvent) => !isBlurEvent && (_names.watchAll || _names.watch.has(name) || [..._names.watch].some((watchName) => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length))));
const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);
    if (field) {
      const { _f, ...currentField } = field;
      if (_f) {
        if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
          return true;
        } else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
          return true;
        } else {
          if (iterateFieldsByAction(currentField, action)) {
            break;
          }
        }
      } else if (isObject(currentField)) {
        if (iterateFieldsByAction(currentField, action)) {
          break;
        }
      }
    }
  }
  return;
};
function schemaErrorLookup(errors, _fields, name) {
  const error = get(errors, name);
  if (error || isKey(name)) {
    return {
      error,
      name
    };
  }
  const names = name.split(".");
  while (names.length) {
    const fieldName = names.join(".");
    const field = get(_fields, fieldName);
    const foundError = get(errors, fieldName);
    if (field && !Array.isArray(field) && name !== fieldName) {
      return { name };
    }
    if (foundError && foundError.type) {
      return {
        name: fieldName,
        error: foundError
      };
    }
    if (foundError && foundError.root && foundError.root.type) {
      return {
        name: `${fieldName}.root`,
        error: foundError.root
      };
    }
    names.pop();
  }
  return {
    name
  };
}
var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
  updateFormState(formStateData);
  const { name, ...formState } = formStateData;
  return isEmptyObject(formState) || Object.keys(formState).length >= Object.keys(_proxyFormState).length || Object.keys(formState).find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
};
var shouldSubscribeByName = (name, signalName, exact) => !name || !signalName || name === signalName || convertToArrayPayload(name).some((currentName) => currentName && (exact ? currentName === signalName : currentName.startsWith(signalName) || signalName.startsWith(currentName)));
var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
  if (mode.isOnAll) {
    return false;
  } else if (!isSubmitted && mode.isOnTouch) {
    return !(isTouched || isBlurEvent);
  } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
    return !isBlurEvent;
  } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
    return isBlurEvent;
  }
  return true;
};
var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
var updateFieldArrayRootError = (errors, error, name) => {
  const fieldArrayErrors = convertToArrayPayload(get(errors, name));
  set(fieldArrayErrors, "root", error[name]);
  set(errors, name, fieldArrayErrors);
  return errors;
};
function getValidateError(result, ref, type = "validate") {
  if (isString(result) || Array.isArray(result) && result.every(isString) || isBoolean(result) && !result) {
    return {
      type,
      message: isString(result) ? result : "",
      ref
    };
  }
}
var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData) ? validationData : {
  value: validationData,
  message: ""
};
var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
  const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount } = field._f;
  const inputValue = get(formValues, name);
  if (!mount || disabledFieldNames.has(name)) {
    return {};
  }
  const inputRef = refs ? refs[0] : ref;
  const setCustomValidity = (message) => {
    if (shouldUseNativeValidation && inputRef.reportValidity) {
      inputRef.setCustomValidity(isBoolean(message) ? "" : message || "");
      inputRef.reportValidity();
    }
  };
  const error = {};
  const isRadio = isRadioInput(ref);
  const isCheckBox = isCheckBoxInput(ref);
  const isRadioOrCheckbox2 = isRadio || isCheckBox;
  const isEmpty = (valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue) || isHTMLElement(ref) && ref.value === "" || inputValue === "" || Array.isArray(inputValue) && !inputValue.length;
  const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
  const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
    const message = exceedMax ? maxLengthMessage : minLengthMessage;
    error[name] = {
      type: exceedMax ? maxType : minType,
      message,
      ref,
      ...appendErrorsCurry(exceedMax ? maxType : minType, message)
    };
  };
  if (isFieldArray ? !Array.isArray(inputValue) || !inputValue.length : required && (!isRadioOrCheckbox2 && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
    const { value, message } = isString(required) ? { value: !!required, message: required } : getValueAndMessage(required);
    if (value) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.required,
        message,
        ref: inputRef,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
    let exceedMax;
    let exceedMin;
    const maxOutput = getValueAndMessage(max);
    const minOutput = getValueAndMessage(min);
    if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
      const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
      if (!isNullOrUndefined(maxOutput.value)) {
        exceedMax = valueNumber > maxOutput.value;
      }
      if (!isNullOrUndefined(minOutput.value)) {
        exceedMin = valueNumber < minOutput.value;
      }
    } else {
      const valueDate = ref.valueAsDate || new Date(inputValue);
      const convertTimeToDate = (time) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + time);
      const isTime = ref.type == "time";
      const isWeek = ref.type == "week";
      if (isString(maxOutput.value) && inputValue) {
        exceedMax = isTime ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value) : isWeek ? inputValue > maxOutput.value : valueDate > new Date(maxOutput.value);
      }
      if (isString(minOutput.value) && inputValue) {
        exceedMin = isTime ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value) : isWeek ? inputValue < minOutput.value : valueDate < new Date(minOutput.value);
      }
    }
    if (exceedMax || exceedMin) {
      getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if ((maxLength || minLength) && !isEmpty && (isString(inputValue) || isFieldArray && Array.isArray(inputValue))) {
    const maxLengthOutput = getValueAndMessage(maxLength);
    const minLengthOutput = getValueAndMessage(minLength);
    const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value;
    const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
    if (exceedMax || exceedMin) {
      getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if (pattern && !isEmpty && isString(inputValue)) {
    const { value: patternValue, message } = getValueAndMessage(pattern);
    if (isRegex(patternValue) && !inputValue.match(patternValue)) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.pattern,
        message,
        ref,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (validate) {
    if (isFunction(validate)) {
      const result = await validate(inputValue, formValues);
      const validateError = getValidateError(result, inputRef);
      if (validateError) {
        error[name] = {
          ...validateError,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(validateError.message);
          return error;
        }
      }
    } else if (isObject(validate)) {
      let validationResult = {};
      for (const key in validate) {
        if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
          break;
        }
        const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
        if (validateError) {
          validationResult = {
            ...validateError,
            ...appendErrorsCurry(key, validateError.message)
          };
          setCustomValidity(validateError.message);
          if (validateAllFieldCriteria) {
            error[name] = validationResult;
          }
        }
      }
      if (!isEmptyObject(validationResult)) {
        error[name] = {
          ref: inputRef,
          ...validationResult
        };
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    }
  }
  setCustomValidity(true);
  return error;
};
const defaultOptions = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true
};
function createFormControl(props = {}) {
  let _options = {
    ...defaultOptions,
    ...props
  };
  let _formState = {
    submitCount: 0,
    isDirty: false,
    isReady: false,
    isLoading: isFunction(_options.defaultValues),
    isValidating: false,
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: false,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: _options.errors || {},
    disabled: _options.disabled || false
  };
  let _fields = {};
  let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values) ? cloneObject(_options.defaultValues || _options.values) || {} : {};
  let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
  let _state = {
    action: false,
    mount: false,
    watch: false
  };
  let _names = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  };
  let delayErrorCallback;
  let timer = 0;
  const _proxyFormState = {
    isDirty: false,
    dirtyFields: false,
    validatingFields: false,
    touchedFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  };
  let _proxySubscribeFormState = {
    ..._proxyFormState
  };
  const _subjects = {
    array: createSubject(),
    state: createSubject()
  };
  const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
  const debounce = (callback) => (wait) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
  const _setValid = async (shouldUpdateValid) => {
    if (!_options.disabled && (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)) {
      const isValid = _options.resolver ? isEmptyObject((await _runSchema()).errors) : await executeBuiltInValidation(_fields, true);
      if (isValid !== _formState.isValid) {
        _subjects.state.next({
          isValid
        });
      }
    }
  };
  const _updateIsValidating = (names, isValidating) => {
    if (!_options.disabled && (_proxyFormState.isValidating || _proxyFormState.validatingFields || _proxySubscribeFormState.isValidating || _proxySubscribeFormState.validatingFields)) {
      (names || Array.from(_names.mount)).forEach((name) => {
        if (name) {
          isValidating ? set(_formState.validatingFields, name, isValidating) : unset(_formState.validatingFields, name);
        }
      });
      _subjects.state.next({
        validatingFields: _formState.validatingFields,
        isValidating: !isEmptyObject(_formState.validatingFields)
      });
    }
  };
  const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
    if (args && method && !_options.disabled) {
      _state.action = true;
      if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
        const fieldValues = method(get(_fields, name), args.argA, args.argB);
        shouldSetValues && set(_fields, name, fieldValues);
      }
      if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
        const errors = method(get(_formState.errors, name), args.argA, args.argB);
        shouldSetValues && set(_formState.errors, name, errors);
        unsetEmptyArray(_formState.errors, name);
      }
      if ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
        const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
        shouldSetValues && set(_formState.touchedFields, name, touchedFields);
      }
      if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) {
        _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
      }
      _subjects.state.next({
        name,
        isDirty: _getDirty(name, values),
        dirtyFields: _formState.dirtyFields,
        errors: _formState.errors,
        isValid: _formState.isValid
      });
    } else {
      set(_formValues, name, values);
    }
  };
  const updateErrors = (name, error) => {
    set(_formState.errors, name, error);
    _subjects.state.next({
      errors: _formState.errors
    });
  };
  const _setErrors = (errors) => {
    _formState.errors = errors;
    _subjects.state.next({
      errors: _formState.errors,
      isValid: false
    });
  };
  const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
    const field = get(_fields, name);
    if (field) {
      const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
      isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
      _state.mount && _setValid();
    }
  };
  const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
    let shouldUpdateField = false;
    let isPreviousDirty = false;
    const output = {
      name
    };
    if (!_options.disabled) {
      if (!isBlurEvent || shouldDirty) {
        if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
          isPreviousDirty = _formState.isDirty;
          _formState.isDirty = output.isDirty = _getDirty();
          shouldUpdateField = isPreviousDirty !== output.isDirty;
        }
        const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
        isPreviousDirty = !!get(_formState.dirtyFields, name);
        isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
        output.dirtyFields = _formState.dirtyFields;
        shouldUpdateField = shouldUpdateField || (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) && isPreviousDirty !== !isCurrentFieldPristine;
      }
      if (isBlurEvent) {
        const isPreviousFieldTouched = get(_formState.touchedFields, name);
        if (!isPreviousFieldTouched) {
          set(_formState.touchedFields, name, isBlurEvent);
          output.touchedFields = _formState.touchedFields;
          shouldUpdateField = shouldUpdateField || (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && isPreviousFieldTouched !== isBlurEvent;
        }
      }
      shouldUpdateField && shouldRender && _subjects.state.next(output);
    }
    return shouldUpdateField ? output : {};
  };
  const shouldRenderByError = (name, isValid, error, fieldState) => {
    const previousFieldError = get(_formState.errors, name);
    const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isBoolean(isValid) && _formState.isValid !== isValid;
    if (_options.delayError && error) {
      delayErrorCallback = debounce(() => updateErrors(name, error));
      delayErrorCallback(_options.delayError);
    } else {
      clearTimeout(timer);
      delayErrorCallback = null;
      error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
    }
    if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
      const updatedFormState = {
        ...fieldState,
        ...shouldUpdateValid && isBoolean(isValid) ? { isValid } : {},
        errors: _formState.errors,
        name
      };
      _formState = {
        ..._formState,
        ...updatedFormState
      };
      _subjects.state.next(updatedFormState);
    }
  };
  const _runSchema = async (name) => {
    _updateIsValidating(name, true);
    const result = await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
    _updateIsValidating(name);
    return result;
  };
  const executeSchemaAndUpdateState = async (names) => {
    const { errors } = await _runSchema(names);
    if (names) {
      for (const name of names) {
        const error = get(errors, name);
        error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
      }
    } else {
      _formState.errors = errors;
    }
    return errors;
  };
  const executeBuiltInValidation = async (fields, shouldOnlyCheckValid, context = {
    valid: true
  }) => {
    for (const name in fields) {
      const field = fields[name];
      if (field) {
        const { _f, ...fieldValue } = field;
        if (_f) {
          const isFieldArrayRoot = _names.array.has(_f.name);
          const isPromiseFunction = field._f && hasPromiseValidation(field._f);
          if (isPromiseFunction && _proxyFormState.validatingFields) {
            _updateIsValidating([_f.name], true);
          }
          const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !shouldOnlyCheckValid, isFieldArrayRoot);
          if (isPromiseFunction && _proxyFormState.validatingFields) {
            _updateIsValidating([_f.name]);
          }
          if (fieldError[_f.name]) {
            context.valid = false;
            if (shouldOnlyCheckValid) {
              break;
            }
          }
          !shouldOnlyCheckValid && (get(fieldError, _f.name) ? isFieldArrayRoot ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name) : set(_formState.errors, _f.name, fieldError[_f.name]) : unset(_formState.errors, _f.name));
        }
        !isEmptyObject(fieldValue) && await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context);
      }
    }
    return context.valid;
  };
  const _removeUnmounted = () => {
    for (const name of _names.unMount) {
      const field = get(_fields, name);
      field && (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) && unregister(name);
    }
    _names.unMount = /* @__PURE__ */ new Set();
  };
  const _getDirty = (name, data) => !_options.disabled && (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues));
  const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
    ..._state.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? { [names]: defaultValue } : defaultValue
  }, isGlobal, defaultValue);
  const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
  const setFieldValue = (name, value, options = {}) => {
    const field = get(_fields, name);
    let fieldValue = value;
    if (field) {
      const fieldReference = field._f;
      if (fieldReference) {
        !fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
        fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value;
        if (isMultipleSelect(fieldReference.ref)) {
          [...fieldReference.ref.options].forEach((optionRef) => optionRef.selected = fieldValue.includes(optionRef.value));
        } else if (fieldReference.refs) {
          if (isCheckBoxInput(fieldReference.ref)) {
            fieldReference.refs.forEach((checkboxRef) => {
              if (!checkboxRef.defaultChecked || !checkboxRef.disabled) {
                if (Array.isArray(fieldValue)) {
                  checkboxRef.checked = !!fieldValue.find((data) => data === checkboxRef.value);
                } else {
                  checkboxRef.checked = fieldValue === checkboxRef.value || !!fieldValue;
                }
              }
            });
          } else {
            fieldReference.refs.forEach((radioRef) => radioRef.checked = radioRef.value === fieldValue);
          }
        } else if (isFileInput(fieldReference.ref)) {
          fieldReference.ref.value = "";
        } else {
          fieldReference.ref.value = fieldValue;
          if (!fieldReference.ref.type) {
            _subjects.state.next({
              name,
              values: cloneObject(_formValues)
            });
          }
        }
      }
    }
    (options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
    options.shouldValidate && trigger(name);
  };
  const setValues = (name, value, options) => {
    for (const fieldKey in value) {
      if (!value.hasOwnProperty(fieldKey)) {
        return;
      }
      const fieldValue = value[fieldKey];
      const fieldName = name + "." + fieldKey;
      const field = get(_fields, fieldName);
      (_names.array.has(name) || isObject(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setValues(fieldName, fieldValue, options) : setFieldValue(fieldName, fieldValue, options);
    }
  };
  const setValue = (name, value, options = {}) => {
    const field = get(_fields, name);
    const isFieldArray = _names.array.has(name);
    const cloneValue = cloneObject(value);
    set(_formValues, name, cloneValue);
    if (isFieldArray) {
      _subjects.array.next({
        name,
        values: cloneObject(_formValues)
      });
      if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields || _proxySubscribeFormState.isDirty || _proxySubscribeFormState.dirtyFields) && options.shouldDirty) {
        _subjects.state.next({
          name,
          dirtyFields: getDirtyFields(_defaultValues, _formValues),
          isDirty: _getDirty(name, cloneValue)
        });
      }
    } else {
      field && !field._f && !isNullOrUndefined(cloneValue) ? setValues(name, cloneValue, options) : setFieldValue(name, cloneValue, options);
    }
    isWatched(name, _names) && _subjects.state.next({ ..._formState, name });
    _subjects.state.next({
      name: _state.mount ? name : void 0,
      values: cloneObject(_formValues)
    });
  };
  const onChange = async (event) => {
    _state.mount = true;
    const target = event.target;
    let name = target.name;
    let isFieldValueUpdated = true;
    const field = get(_fields, name);
    const _updateIsFieldValueUpdated = (fieldValue) => {
      isFieldValueUpdated = Number.isNaN(fieldValue) || isDateObject(fieldValue) && isNaN(fieldValue.getTime()) || deepEqual(fieldValue, get(_formValues, name, fieldValue));
    };
    const validationModeBeforeSubmit = getValidationModes(_options.mode);
    const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
    if (field) {
      let error;
      let isValid;
      const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event);
      const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
      const shouldSkipValidation = !hasValidation(field._f) && !_options.resolver && !get(_formState.errors, name) && !field._f.deps || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
      const watched = isWatched(name, _names, isBlurEvent);
      set(_formValues, name, fieldValue);
      if (isBlurEvent) {
        if (!target || !target.readOnly) {
          field._f.onBlur && field._f.onBlur(event);
          delayErrorCallback && delayErrorCallback(0);
        }
      } else if (field._f.onChange) {
        field._f.onChange(event);
      }
      const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
      const shouldRender = !isEmptyObject(fieldState) || watched;
      !isBlurEvent && _subjects.state.next({
        name,
        type: event.type,
        values: cloneObject(_formValues)
      });
      if (shouldSkipValidation) {
        if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
          if (_options.mode === "onBlur") {
            if (isBlurEvent) {
              _setValid();
            }
          } else if (!isBlurEvent) {
            _setValid();
          }
        }
        return shouldRender && _subjects.state.next({ name, ...watched ? {} : fieldState });
      }
      !isBlurEvent && watched && _subjects.state.next({ ..._formState });
      if (_options.resolver) {
        const { errors } = await _runSchema([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
          const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
          error = errorLookupResult.error;
          name = errorLookupResult.name;
          isValid = isEmptyObject(errors);
        }
      } else {
        _updateIsValidating([name], true);
        error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          if (error) {
            isValid = false;
          } else if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
            isValid = await executeBuiltInValidation(_fields, true);
          }
        }
      }
      if (isFieldValueUpdated) {
        field._f.deps && (!Array.isArray(field._f.deps) || field._f.deps.length > 0) && trigger(field._f.deps);
        shouldRenderByError(name, isValid, error, fieldState);
      }
    }
  };
  const _focusInput = (ref, key) => {
    if (get(_formState.errors, key) && ref.focus) {
      ref.focus();
      return 1;
    }
    return;
  };
  const trigger = async (name, options = {}) => {
    let isValid;
    let validationResult;
    const fieldNames = convertToArrayPayload(name);
    if (_options.resolver) {
      const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
      isValid = isEmptyObject(errors);
      validationResult = name ? !fieldNames.some((name2) => get(errors, name2)) : isValid;
    } else if (name) {
      validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
        const field = get(_fields, fieldName);
        return await executeBuiltInValidation(field && field._f ? { [fieldName]: field } : field);
      }))).every(Boolean);
      !(!validationResult && !_formState.isValid) && _setValid();
    } else {
      validationResult = isValid = await executeBuiltInValidation(_fields);
    }
    _subjects.state.next({
      ...!isString(name) || (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isValid !== _formState.isValid ? {} : { name },
      ..._options.resolver || !name ? { isValid } : {},
      errors: _formState.errors
    });
    options.shouldFocus && !validationResult && iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
    return validationResult;
  };
  const getValues = (fieldNames, config) => {
    let values = {
      ..._state.mount ? _formValues : _defaultValues
    };
    if (config) {
      values = extractFormValues(config.dirtyFields ? _formState.dirtyFields : _formState.touchedFields, values);
    }
    return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map((name) => get(values, name));
  };
  const getFieldState = (name, formState) => ({
    invalid: !!get((formState || _formState).errors, name),
    isDirty: !!get((formState || _formState).dirtyFields, name),
    error: get((formState || _formState).errors, name),
    isValidating: !!get(_formState.validatingFields, name),
    isTouched: !!get((formState || _formState).touchedFields, name)
  });
  const clearErrors = (name) => {
    name && convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName));
    _subjects.state.next({
      errors: name ? _formState.errors : {}
    });
  };
  const setError = (name, error, options) => {
    const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
    const currentError = get(_formState.errors, name) || {};
    const { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
    set(_formState.errors, name, {
      ...restOfErrorTree,
      ...error,
      ref
    });
    _subjects.state.next({
      name,
      errors: _formState.errors,
      isValid: false
    });
    options && options.shouldFocus && ref && ref.focus && ref.focus();
  };
  const watch = (name, defaultValue) => isFunction(name) ? _subjects.state.subscribe({
    next: (payload) => "values" in payload && name(_getWatch(void 0, defaultValue), payload)
  }) : _getWatch(name, defaultValue, true);
  const _subscribe = (props2) => _subjects.state.subscribe({
    next: (formState) => {
      if (shouldSubscribeByName(props2.name, formState.name, props2.exact) && shouldRenderFormState(formState, props2.formState || _proxyFormState, _setFormState, props2.reRenderRoot)) {
        props2.callback({
          values: { ..._formValues },
          ..._formState,
          ...formState,
          defaultValues: _defaultValues
        });
      }
    }
  }).unsubscribe;
  const subscribe = (props2) => {
    _state.mount = true;
    _proxySubscribeFormState = {
      ..._proxySubscribeFormState,
      ...props2.formState
    };
    return _subscribe({
      ...props2,
      formState: _proxySubscribeFormState
    });
  };
  const unregister = (name, options = {}) => {
    for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
      _names.mount.delete(fieldName);
      _names.array.delete(fieldName);
      if (!options.keepValue) {
        unset(_fields, fieldName);
        unset(_formValues, fieldName);
      }
      !options.keepError && unset(_formState.errors, fieldName);
      !options.keepDirty && unset(_formState.dirtyFields, fieldName);
      !options.keepTouched && unset(_formState.touchedFields, fieldName);
      !options.keepIsValidating && unset(_formState.validatingFields, fieldName);
      !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
    }
    _subjects.state.next({
      values: cloneObject(_formValues)
    });
    _subjects.state.next({
      ..._formState,
      ...!options.keepDirty ? {} : { isDirty: _getDirty() }
    });
    !options.keepIsValid && _setValid();
  };
  const _setDisabledField = ({ disabled, name }) => {
    if (isBoolean(disabled) && _state.mount || !!disabled || _names.disabled.has(name)) {
      disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
    }
  };
  const register = (name, options = {}) => {
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
    set(_fields, name, {
      ...field || {},
      _f: {
        ...field && field._f ? field._f : { ref: { name } },
        name,
        mount: true,
        ...options
      }
    });
    _names.mount.add(name);
    if (field) {
      _setDisabledField({
        disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
        name
      });
    } else {
      updateValidAndValue(name, true, options.value);
    }
    return {
      ...disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {},
      ..._options.progressive ? {
        required: !!options.required,
        min: getRuleValue(options.min),
        max: getRuleValue(options.max),
        minLength: getRuleValue(options.minLength),
        maxLength: getRuleValue(options.maxLength),
        pattern: getRuleValue(options.pattern)
      } : {},
      name,
      onChange,
      onBlur: onChange,
      ref: (ref) => {
        if (ref) {
          register(name, options);
          field = get(_fields, name);
          const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll("input,select,textarea")[0] || ref : ref : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];
          if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref) {
            return;
          }
          set(_fields, name, {
            _f: {
              ...field._f,
              ...radioOrCheckbox ? {
                refs: [
                  ...refs.filter(live),
                  fieldRef,
                  ...Array.isArray(get(_defaultValues, name)) ? [{}] : []
                ],
                ref: { type: fieldRef.type, name }
              } : { ref: fieldRef }
            }
          });
          updateValidAndValue(name, false, void 0, fieldRef);
        } else {
          field = get(_fields, name, {});
          if (field._f) {
            field._f.mount = false;
          }
          (_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _state.action) && _names.unMount.add(name);
        }
      }
    };
  };
  const _focusError = () => _options.shouldFocusError && iterateFieldsByAction(_fields, _focusInput, _names.mount);
  const _disableForm = (disabled) => {
    if (isBoolean(disabled)) {
      _subjects.state.next({ disabled });
      iterateFieldsByAction(_fields, (ref, name) => {
        const currentField = get(_fields, name);
        if (currentField) {
          ref.disabled = currentField._f.disabled || disabled;
          if (Array.isArray(currentField._f.refs)) {
            currentField._f.refs.forEach((inputRef) => {
              inputRef.disabled = currentField._f.disabled || disabled;
            });
          }
        }
      }, 0, false);
    }
  };
  const handleSubmit = (onValid, onInvalid) => async (e) => {
    let onValidError = void 0;
    if (e) {
      e.preventDefault && e.preventDefault();
      e.persist && e.persist();
    }
    let fieldValues = cloneObject(_formValues);
    _subjects.state.next({
      isSubmitting: true
    });
    if (_options.resolver) {
      const { errors, values } = await _runSchema();
      _formState.errors = errors;
      fieldValues = cloneObject(values);
    } else {
      await executeBuiltInValidation(_fields);
    }
    if (_names.disabled.size) {
      for (const name of _names.disabled) {
        unset(fieldValues, name);
      }
    }
    unset(_formState.errors, "root");
    if (isEmptyObject(_formState.errors)) {
      _subjects.state.next({
        errors: {}
      });
      try {
        await onValid(fieldValues, e);
      } catch (error) {
        onValidError = error;
      }
    } else {
      if (onInvalid) {
        await onInvalid({ ..._formState.errors }, e);
      }
      _focusError();
      setTimeout(_focusError);
    }
    _subjects.state.next({
      isSubmitted: true,
      isSubmitting: false,
      isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
      submitCount: _formState.submitCount + 1,
      errors: _formState.errors
    });
    if (onValidError) {
      throw onValidError;
    }
  };
  const resetField = (name, options = {}) => {
    if (get(_fields, name)) {
      if (isUndefined(options.defaultValue)) {
        setValue(name, cloneObject(get(_defaultValues, name)));
      } else {
        setValue(name, options.defaultValue);
        set(_defaultValues, name, cloneObject(options.defaultValue));
      }
      if (!options.keepTouched) {
        unset(_formState.touchedFields, name);
      }
      if (!options.keepDirty) {
        unset(_formState.dirtyFields, name);
        _formState.isDirty = options.defaultValue ? _getDirty(name, cloneObject(get(_defaultValues, name))) : _getDirty();
      }
      if (!options.keepError) {
        unset(_formState.errors, name);
        _proxyFormState.isValid && _setValid();
      }
      _subjects.state.next({ ..._formState });
    }
  };
  const _reset = (formValues, keepStateOptions = {}) => {
    const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
    const cloneUpdatedValues = cloneObject(updatedValues);
    const isEmptyResetValues = isEmptyObject(formValues);
    const values = isEmptyResetValues ? _defaultValues : cloneUpdatedValues;
    if (!keepStateOptions.keepDefaultValues) {
      _defaultValues = updatedValues;
    }
    if (!keepStateOptions.keepValues) {
      if (keepStateOptions.keepDirtyValues) {
        const fieldsToCheck = /* @__PURE__ */ new Set([
          ..._names.mount,
          ...Object.keys(getDirtyFields(_defaultValues, _formValues))
        ]);
        for (const fieldName of Array.from(fieldsToCheck)) {
          get(_formState.dirtyFields, fieldName) ? set(values, fieldName, get(_formValues, fieldName)) : setValue(fieldName, get(values, fieldName));
        }
      } else {
        if (isWeb && isUndefined(formValues)) {
          for (const name of _names.mount) {
            const field = get(_fields, name);
            if (field && field._f) {
              const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
              if (isHTMLElement(fieldReference)) {
                const form = fieldReference.closest("form");
                if (form) {
                  form.reset();
                  break;
                }
              }
            }
          }
        }
        if (keepStateOptions.keepFieldsRef) {
          for (const fieldName of _names.mount) {
            setValue(fieldName, get(values, fieldName));
          }
        } else {
          _fields = {};
        }
      }
      _formValues = _options.shouldUnregister ? keepStateOptions.keepDefaultValues ? cloneObject(_defaultValues) : {} : cloneObject(values);
      _subjects.array.next({
        values: { ...values }
      });
      _subjects.state.next({
        values: { ...values }
      });
    }
    _names = {
      mount: keepStateOptions.keepDirtyValues ? _names.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: false,
      focus: ""
    };
    _state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid || !!keepStateOptions.keepDirtyValues;
    _state.watch = !!_options.shouldUnregister;
    _subjects.state.next({
      submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
      isDirty: isEmptyResetValues ? false : keepStateOptions.keepDirty ? _formState.isDirty : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
      isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
      dirtyFields: isEmptyResetValues ? {} : keepStateOptions.keepDirtyValues ? keepStateOptions.keepDefaultValues && _formValues ? getDirtyFields(_defaultValues, _formValues) : _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : keepStateOptions.keepDirty ? _formState.dirtyFields : {},
      touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
      errors: keepStateOptions.keepErrors ? _formState.errors : {},
      isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful ? _formState.isSubmitSuccessful : false,
      isSubmitting: false,
      defaultValues: _defaultValues
    });
  };
  const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues) ? formValues(_formValues) : formValues, keepStateOptions);
  const setFocus = (name, options = {}) => {
    const field = get(_fields, name);
    const fieldReference = field && field._f;
    if (fieldReference) {
      const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
      if (fieldRef.focus) {
        fieldRef.focus();
        options.shouldSelect && isFunction(fieldRef.select) && fieldRef.select();
      }
    }
  };
  const _setFormState = (updatedFormState) => {
    _formState = {
      ..._formState,
      ...updatedFormState
    };
  };
  const _resetDefaultValues = () => isFunction(_options.defaultValues) && _options.defaultValues().then((values) => {
    reset(values, _options.resetOptions);
    _subjects.state.next({
      isLoading: false
    });
  });
  const methods = {
    control: {
      register,
      unregister,
      getFieldState,
      handleSubmit,
      setError,
      _subscribe,
      _runSchema,
      _focusError,
      _getWatch,
      _getDirty,
      _setValid,
      _setFieldArray,
      _setDisabledField,
      _setErrors,
      _getFieldArray,
      _reset,
      _resetDefaultValues,
      _removeUnmounted,
      _disableForm,
      _subjects,
      _proxyFormState,
      get _fields() {
        return _fields;
      },
      get _formValues() {
        return _formValues;
      },
      get _state() {
        return _state;
      },
      set _state(value) {
        _state = value;
      },
      get _defaultValues() {
        return _defaultValues;
      },
      get _names() {
        return _names;
      },
      set _names(value) {
        _names = value;
      },
      get _formState() {
        return _formState;
      },
      get _options() {
        return _options;
      },
      set _options(value) {
        _options = {
          ..._options,
          ...value
        };
      }
    },
    subscribe,
    trigger,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    resetField,
    clearErrors,
    unregister,
    setError,
    setFocus,
    getFieldState
  };
  return {
    ...methods,
    formControl: methods
  };
}
function useForm(props = {}) {
  const _formControl = React.useRef(void 0);
  const _values = React.useRef(void 0);
  const [formState, updateFormState] = React.useState({
    isDirty: false,
    isValidating: false,
    isLoading: isFunction(props.defaultValues),
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: props.errors || {},
    disabled: props.disabled || false,
    isReady: false,
    defaultValues: isFunction(props.defaultValues) ? void 0 : props.defaultValues
  });
  if (!_formControl.current) {
    if (props.formControl) {
      _formControl.current = {
        ...props.formControl,
        formState
      };
      if (props.defaultValues && !isFunction(props.defaultValues)) {
        props.formControl.reset(props.defaultValues, props.resetOptions);
      }
    } else {
      const { formControl, ...rest } = createFormControl(props);
      _formControl.current = {
        ...rest,
        formState
      };
    }
  }
  const control = _formControl.current.control;
  control._options = props;
  useIsomorphicLayoutEffect(() => {
    const sub = control._subscribe({
      formState: control._proxyFormState,
      callback: () => updateFormState({ ...control._formState }),
      reRenderRoot: true
    });
    updateFormState((data) => ({
      ...data,
      isReady: true
    }));
    control._formState.isReady = true;
    return sub;
  }, [control]);
  React.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
  React.useEffect(() => {
    if (props.mode) {
      control._options.mode = props.mode;
    }
    if (props.reValidateMode) {
      control._options.reValidateMode = props.reValidateMode;
    }
  }, [control, props.mode, props.reValidateMode]);
  React.useEffect(() => {
    if (props.errors) {
      control._setErrors(props.errors);
      control._focusError();
    }
  }, [control, props.errors]);
  React.useEffect(() => {
    props.shouldUnregister && control._subjects.state.next({
      values: control._getWatch()
    });
  }, [control, props.shouldUnregister]);
  React.useEffect(() => {
    if (control._proxyFormState.isDirty) {
      const isDirty = control._getDirty();
      if (isDirty !== formState.isDirty) {
        control._subjects.state.next({
          isDirty
        });
      }
    }
  }, [control, formState.isDirty]);
  React.useEffect(() => {
    if (props.values && !deepEqual(props.values, _values.current)) {
      control._reset(props.values, {
        keepFieldsRef: true,
        ...control._options.resetOptions
      });
      _values.current = props.values;
      updateFormState((state) => ({ ...state }));
    } else {
      control._resetDefaultValues();
    }
  }, [control, props.values]);
  React.useEffect(() => {
    if (!control._state.mount) {
      control._setValid();
      control._state.mount = true;
    }
    if (control._state.watch) {
      control._state.watch = false;
      control._subjects.state.next({ ...control._formState });
    }
    control._removeUnmounted();
  });
  _formControl.current.formState = getProxyFormState(formState, control);
  return _formControl.current;
}
function AddTestModal({ open, onClose }) {
  const addTest = useAddTest();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      sampleType: "",
      mrp: 0,
      labCost: 0,
      doctorCommission: 0,
      isActive: true
    }
  });
  const isActive = watch("isActive");
  const watchedMrp = watch("mrp");
  const watchedLabCost = watch("labCost");
  const watchedDoctorCommission = watch("doctorCommission");
  const commissionAmt = (watchedMrp ?? 0) * ((watchedDoctorCommission ?? 0) / 100);
  const profitPerTest = (watchedMrp ?? 0) - (watchedLabCost ?? 0) - commissionAmt;
  const showLossWarning = profitPerTest < 0 && (watchedMrp ?? 0) > 0;
  reactExports.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const onSubmit = async (values) => {
    try {
      const result = await addTest.mutateAsync({
        name: values.name.trim(),
        code: values.code.trim().toUpperCase(),
        sampleType: values.sampleType.trim(),
        price: BigInt(Math.round(values.mrp)),
        isActive: values.isActive
      });
      if (result.__kind__ === "err") {
        if (result.err === TestError.duplicateCode) {
          setError("code", {
            type: "manual",
            message: "Test code already exists."
          });
          return;
        }
        ue.error("Failed to add test. Please try again.");
        return;
      }
      const code = values.code.trim().toUpperCase();
      addDemoTestMaster({
        id: code,
        testName: values.name.trim(),
        testCode: code,
        mrp: values.mrp,
        labCost: values.labCost ?? 0,
        doctorCommissionPct: values.doctorCommission ?? 0,
        sampleType: values.sampleType.trim(),
        isActive: values.isActive
      });
      ue.success(`Test "${values.name}" added successfully`);
      reset();
      onClose();
    } catch (err) {
      const msg = (err == null ? void 0 : err.message) ?? String(err);
      ue.error(`Failed to add test: ${msg}`);
    }
  };
  const handleClose = () => {
    if (addTest.isPending) return;
    reset();
    onClose();
  };
  if (!open) return null;
  const hasGeneralError = addTest.isError;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
      style: { animation: "modalBackdropIn 200ms ease-in-out forwards" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/50",
            onClick: handleClose,
            onKeyDown: (e) => e.key === "Escape" && handleClose(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            open: true,
            className: "relative w-full max-w-md bg-white rounded-2xl border-0 flex flex-col",
            style: {
              boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(13,71,161,0.10)",
              animation: "modalPanelIn 200ms ease-in-out forwards",
              maxHeight: "90vh",
              overflow: "hidden"
            },
            "aria-labelledby": "add-test-title",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 bg-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "add-test-title",
                      className: "text-lg font-bold text-gray-900 tracking-tight",
                      children: "Add New Test"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Fill in the details below to add a new test to the master list." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    disabled: addTest.isPending,
                    className: "ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  id: "add-test-form",
                  onSubmit: handleSubmit(onSubmit),
                  className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
                  style: { overflowY: "auto", WebkitOverflowScrolling: "touch" },
                  children: [
                    hasGeneralError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-red-500 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700 font-medium", children: "Failed to add test. Please check your inputs and try again." })
                    ] }),
                    showLossWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-800 font-medium", children: [
                        "Warning: This test will generate negative profit. (MRP ₹",
                        watchedMrp,
                        " − Lab Cost ₹",
                        watchedLabCost ?? 0,
                        " − Commission ₹",
                        Math.round(commissionAmt),
                        " = ₹",
                        Math.round(profitPerTest),
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-name",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "Test Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-name",
                          placeholder: "e.g. Complete Blood Count",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.name ? "border-red-400" : "border-gray-200"}`,
                          ...register("name", { required: "Test name is required" })
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.name.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-code",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "Test Code ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-code",
                          placeholder: "e.g. CBC",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 uppercase ${errors.code ? "border-red-400" : "border-gray-200"}`,
                          ...register("code", {
                            required: "Test code is required",
                            pattern: {
                              value: /^[A-Za-z0-9_-]+$/,
                              message: "Only letters, numbers, hyphens and underscores allowed"
                            }
                          })
                        }
                      ),
                      errors.code && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.code.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-sampleType",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "Sample Type ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-sampleType",
                          placeholder: "e.g. Blood, Urine, Serum",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.sampleType ? "border-red-400" : "border-gray-200"}`,
                          ...register("sampleType", {
                            required: "Sample type is required"
                          })
                        }
                      ),
                      errors.sampleType && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.sampleType.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-mrp",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "MRP (₹) ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-mrp",
                          type: "number",
                          min: 0,
                          step: 1,
                          placeholder: "e.g. 500",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.mrp ? "border-red-400" : "border-gray-200"}`,
                          ...register("mrp", {
                            required: "MRP is required",
                            min: { value: 0, message: "MRP must be 0 or more" },
                            valueAsNumber: true
                          })
                        }
                      ),
                      errors.mrp && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.mrp.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "add-labCost",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "Lab Cost (₹)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-labCost",
                          type: "number",
                          min: 0,
                          step: 1,
                          placeholder: "e.g. 40",
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                          ...register("labCost", {
                            min: { value: 0, message: "Lab cost must be 0 or more" },
                            valueAsNumber: true
                          })
                        }
                      ),
                      errors.labCost && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.labCost.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "add-doctorCommission",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "Doctor Commission (%)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-doctorCommission",
                          type: "number",
                          min: 0,
                          max: 100,
                          step: 0.01,
                          placeholder: "e.g. 50",
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                          ...register("doctorCommission", {
                            min: { value: 0, message: "Commission must be 0 or more" },
                            max: { value: 100, message: "Commission cannot exceed 100%" },
                            valueAsNumber: true
                          })
                        }
                      ),
                      errors.doctorCommission && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.doctorCommission.message
                      ] })
                    ] }),
                    (watchedMrp ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-xs flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                        "Commission: ₹",
                        Math.round(commissionAmt)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "|" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: profitPerTest >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold",
                          children: [
                            "Profit per Test: ₹",
                            Math.round(profitPerTest)
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-3 bg-gray-50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-700 uppercase tracking-wide", children: "Status" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: isActive ? "Test is Active" : "Test is Inactive" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Switch,
                        {
                          checked: isActive,
                          onCheckedChange: (val) => setValue("isActive", val)
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    disabled: addTest.isPending,
                    className: "flex-1 h-10 rounded-xl border-2 border-gray-300 bg-transparent text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    "data-ocid": "add-test.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    form: "add-test-form",
                    disabled: addTest.isPending,
                    className: "flex-[2] flex items-center justify-center gap-2 h-10 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100",
                    style: {
                      background: addTest.isPending ? void 0 : "linear-gradient(to right, #2563EB, #26C6DA)",
                      backgroundColor: addTest.isPending ? "#9ca3af" : void 0
                    },
                    "data-ocid": "add-test.submit_button",
                    children: [
                      addTest.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Add Test"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function DisableTestConfirmDialog({
  open,
  test,
  onClose
}) {
  const disableTest = useDisableTest();
  const handleConfirm = async () => {
    if (!test) return;
    try {
      await disableTest.mutateAsync(test.code);
      ue.success(`Test "${test.name}" has been disabled`);
      onClose();
    } catch (err) {
      const msg = (err == null ? void 0 : err.message) ?? String(err);
      ue.error(`Failed to disable test: ${msg}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AlertDialog,
    {
      open,
      onOpenChange: (o) => {
        if (!o) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Disable Test" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
            "Are you sure you want to disable",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: test == null ? void 0 : test.name }),
            "?",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "The test will be marked as",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Inactive" }),
            " and will not be permanently deleted. You can re-enable it later by editing the test."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: disableTest.isPending, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AlertDialogAction,
            {
              onClick: handleConfirm,
              disabled: disableTest.isPending,
              className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              children: [
                disableTest.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Disable Test"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function EditTestModal({
  open,
  test,
  onClose
}) {
  const updateTest = useUpdateTest();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      sampleType: "",
      mrp: 0,
      labCost: 0,
      doctorCommission: 0,
      isActive: true
    }
  });
  const isActive = watch("isActive");
  const watchedMrp = watch("mrp");
  const watchedLabCost = watch("labCost");
  const watchedDoctorCommission = watch("doctorCommission");
  const commissionAmt = (watchedMrp ?? 0) * ((watchedDoctorCommission ?? 0) / 100);
  const profitPerTest = computeProfitPerTest(
    watchedMrp ?? 0,
    watchedLabCost ?? 0,
    watchedDoctorCommission ?? 0
  );
  const showLossWarning = profitPerTest < 0 && (watchedMrp ?? 0) > 0;
  reactExports.useEffect(() => {
    if (test) {
      reset({
        name: test.name,
        code: test.code,
        sampleType: test.sampleType,
        mrp: Number(test.price),
        labCost: test.labCost ?? 0,
        doctorCommission: test.doctorCommission ?? 0,
        isActive: test.isActive
      });
    }
  }, [test, reset]);
  const onSubmit = async (values) => {
    if (!test) return;
    try {
      const result = await updateTest.mutateAsync({
        code: test.code,
        input: {
          name: values.name.trim(),
          code: values.code.trim().toUpperCase(),
          sampleType: values.sampleType.trim(),
          price: BigInt(Math.round(values.mrp)),
          isActive: values.isActive
        }
      });
      if (result.__kind__ === "err") {
        if (result.err === TestError.duplicateCode) {
          setError("code", {
            type: "manual",
            message: "Test code already exists."
          });
          return;
        }
        ue.error("Failed to update test. Please try again.");
        return;
      }
      updateDemoTestMaster(test.code, {
        labCost: values.labCost ?? 0,
        doctorCommissionPct: values.doctorCommission ?? 0,
        mrp: values.mrp
      });
      ue.success(`Test "${values.name}" updated successfully`);
      onClose();
    } catch (err) {
      const msg = (err == null ? void 0 : err.message) ?? String(err);
      ue.error(`Failed to update test: ${msg}`);
    }
  };
  const handleClose = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (o) => {
        if (!o) handleClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "sm:max-w-md p-0 gap-0 flex flex-col overflow-hidden",
          style: { maxHeight: "90vh" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "flex-shrink-0 px-6 pt-6 pb-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Test" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the details for this test. You may also change the Test Code." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 overflow-y-auto px-6 py-5 space-y-4",
                style: { overflowY: "auto", WebkitOverflowScrolling: "touch" },
                children: [
                  showLossWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600 mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-800 font-medium", children: [
                      "Warning: This test will generate negative profit. (MRP ₹",
                      watchedMrp,
                      " − Lab Cost ₹",
                      watchedLabCost ?? 0,
                      " − Commission ₹",
                      Math.round(commissionAmt),
                      " = ₹",
                      Math.round(profitPerTest),
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      id: "edit-test-form",
                      onSubmit: handleSubmit(onSubmit),
                      className: "space-y-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-name", children: [
                            "Test Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-name",
                              placeholder: "e.g. Complete Blood Count",
                              ...register("name", { required: "Test name is required" })
                            }
                          ),
                          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-code", children: [
                            "Test Code ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-code",
                              placeholder: "e.g. CBC",
                              className: "uppercase",
                              ...register("code", {
                                required: "Test code is required",
                                pattern: {
                                  value: /^[A-Za-z0-9_-]+$/,
                                  message: "Only letters, numbers, hyphens and underscores allowed"
                                }
                              })
                            }
                          ),
                          errors.code && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.code.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-sampleType", children: [
                            "Sample Type ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-sampleType",
                              placeholder: "e.g. Blood, Urine, Serum",
                              ...register("sampleType", {
                                required: "Sample type is required"
                              })
                            }
                          ),
                          errors.sampleType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.sampleType.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-mrp", children: [
                            "MRP (₹) ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-mrp",
                              type: "number",
                              min: 0,
                              step: 1,
                              placeholder: "e.g. 500",
                              ...register("mrp", {
                                required: "MRP is required",
                                min: { value: 0, message: "MRP must be 0 or more" },
                                valueAsNumber: true
                              })
                            }
                          ),
                          errors.mrp && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.mrp.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-labCost", children: "Lab Cost (₹)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-labCost",
                              type: "number",
                              min: 0,
                              step: 1,
                              placeholder: "e.g. 40",
                              ...register("labCost", {
                                min: { value: 0, message: "Lab cost must be 0 or more" },
                                valueAsNumber: true
                              })
                            }
                          ),
                          errors.labCost && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.labCost.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-doctorCommission", children: "Doctor Commission (%)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-doctorCommission",
                              type: "number",
                              min: 0,
                              max: 100,
                              step: 0.01,
                              placeholder: "e.g. 50",
                              ...register("doctorCommission", {
                                min: { value: 0, message: "Commission must be 0 or more" },
                                max: { value: 100, message: "Commission cannot exceed 100%" },
                                valueAsNumber: true
                              })
                            }
                          ),
                          errors.doctorCommission && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.doctorCommission.message })
                        ] }),
                        (watchedMrp ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-xs flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                            "Commission: ₹",
                            Math.round(commissionAmt)
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "|" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: profitPerTest >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold",
                              children: [
                                "Profit per Test: ₹",
                                Math.round(profitPerTest)
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border p-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Status" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isActive ? "Test is Active" : "Test is Inactive" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Switch,
                            {
                              checked: isActive,
                              onCheckedChange: (val) => setValue("isActive", val)
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex-shrink-0 px-6 py-4 border-t border-border bg-background", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleClose,
                  disabled: updateTest.isPending,
                  "data-ocid": "edit-test.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  form: "edit-test-form",
                  disabled: updateTest.isPending,
                  "data-ocid": "edit-test.submit_button",
                  children: [
                    updateTest.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                    "Save Changes"
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const PAGE_SIZE = 20;
function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { rows: [], parseErrors: 0 };
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));
  const colIndex = (names) => {
    for (const name of names) {
      const idx = headers.indexOf(name);
      if (idx !== -1) return idx;
    }
    return -1;
  };
  const nameIdx = colIndex(["testname", "test name", "name"]);
  const codeIdx = colIndex(["testcode", "test code", "code"]);
  const sampleIdx = colIndex(["sampletype", "sample type", "sample"]);
  const mrpIdx = colIndex(["mrp", "price"]);
  const rows = [];
  let parseErrors = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cells = line.split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
    const testName = nameIdx !== -1 ? (cells[nameIdx] ?? "").trim() : "";
    const testCode = codeIdx !== -1 ? (cells[codeIdx] ?? "").trim().toUpperCase() : "";
    const sampleType = sampleIdx !== -1 ? (cells[sampleIdx] ?? "").trim() : "";
    const mrpRaw = mrpIdx !== -1 ? (cells[mrpIdx] ?? "").trim() : "";
    const mrp = Number.parseFloat(mrpRaw);
    if (!testName || !testCode || !sampleType || !mrpRaw || Number.isNaN(mrp) || mrp < 0) {
      parseErrors++;
      continue;
    }
    rows.push({ testName, testCode, sampleType, mrp });
  }
  return { rows, parseErrors };
}
function ProfitDot({ color }) {
  const cls = color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-red-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block w-2 h-2 rounded-full flex-shrink-0 ${cls}`,
      title: color === "green" ? "Profitable (>30%)" : color === "yellow" ? "Low profit (10–30%)" : "Loss / <10%"
    }
  );
}
function TestStatusBadge({ isActive }) {
  if (isActive) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }),
      "Active"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gray-400" }),
    "Inactive"
  ] });
}
function TestManagementPage({ role }) {
  const isSuperAdmin = role === "superAdmin";
  const { data: tests = [], isLoading, isError } = useGetAllTests();
  const bulkAddMutation = useBulkAddTests();
  const setTestStatusMutation = useSetTestStatus();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [togglingIds, setTogglingIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [addModalOpen, setAddModalOpen] = reactExports.useState(false);
  const [editModalOpen, setEditModalOpen] = reactExports.useState(false);
  const [selectedTest, setSelectedTest] = reactExports.useState(null);
  const [disableDialogOpen, setDisableDialogOpen] = reactExports.useState(false);
  const [testToDisable, setTestToDisable] = reactExports.useState(null);
  const csvInputRef = reactExports.useRef(null);
  const filteredTests = reactExports.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tests;
    return tests.filter(
      (t) => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)
    );
  }, [tests, searchQuery]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const totalPages = Math.max(1, Math.ceil(filteredTests.length / PAGE_SIZE));
  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const handleEditClick = (test) => {
    setSelectedTest(test);
    setEditModalOpen(true);
  };
  const handleDisableClick = (test) => {
    setTestToDisable(test);
    setDisableDialogOpen(true);
  };
  const handleToggleStatus = async (test, newIsActive) => {
    const testId = test.id;
    setTogglingIds((prev) => new Set(prev).add(testId));
    try {
      const result = await setTestStatusMutation.mutateAsync({
        testId,
        isActive: newIsActive
      });
      if (result.__kind__ === "err") {
        ue.error("Failed to update test status.");
      } else {
        ue.success(
          `Test "${test.name}" marked as ${newIsActive ? "Active" : "Inactive"}.`
        );
      }
    } catch (err) {
      ue.error(
        `Failed to update test status: ${(err == null ? void 0 : err.message) ?? String(err)}`
      );
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(testId);
        return next;
      });
    }
  };
  const formatMRP = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };
  const handleCSVUploadClick = () => {
    if (csvInputRef.current) {
      csvInputRef.current.value = "";
      csvInputRef.current.click();
    }
  };
  const handleCSVFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      var _a2;
      const content = (_a2 = event.target) == null ? void 0 : _a2.result;
      if (!content) {
        ue.error("Could not read the CSV file.");
        return;
      }
      const { rows: parsedRows, parseErrors } = parseCSV(content);
      const existingCodes = new Set(tests.map((t) => t.code.toUpperCase()));
      let skippedDuplicates = 0;
      const validInputs = [];
      for (const row of parsedRows) {
        if (existingCodes.has(row.testCode.toUpperCase())) {
          skippedDuplicates++;
          continue;
        }
        validInputs.push({
          name: row.testName,
          code: row.testCode,
          sampleType: row.sampleType,
          price: BigInt(Math.round(row.mrp)),
          isActive: true
        });
      }
      const totalSkipped = parseErrors + skippedDuplicates;
      if (validInputs.length === 0) {
        ue.warning("0 tests added successfully.");
        if (totalSkipped > 0) {
          ue.error(`${totalSkipped} rows skipped due to errors.`);
        }
        return;
      }
      setIsUploading(true);
      try {
        const added = await bulkAddMutation.mutateAsync(validInputs);
        ue.success(
          `${added.length} test${added.length !== 1 ? "s" : ""} added successfully.`
        );
        if (totalSkipped > 0) {
          ue.warning(
            `${totalSkipped} row${totalSkipped !== 1 ? "s" : ""} skipped (duplicates or invalid data).`
          );
        }
      } catch (err) {
        ue.error(`Upload failed: ${(err == null ? void 0 : err.message) ?? String(err)}`);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsText(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "🧪 Test Management",
        description: "Manage diagnostic tests, pricing, and availability",
        actionLabel: "Add Test",
        onAction: () => setAddModalOpen(true)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground", children: "Test Management" })
      ] }),
      isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleCSVUploadClick,
            disabled: isUploading,
            children: [
              isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-1.5 h-4 w-4" }),
              "Upload CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setAddModalOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          "Add Test"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: csvInputRef,
        type: "file",
        accept: ".csv,text/csv",
        className: "hidden",
        onChange: handleCSVFileChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by name or code…",
          value: searchQuery,
          onChange: handleSearchChange,
          className: "pl-9"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Test Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Sample Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "MRP" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Lab Cost" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Commission %" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: "Profit (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Status" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-center", children: "Active" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? Array.from({ length: 5 }, (_, i) => `skel-row-${i}`).map(
        (key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 mx-auto" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) })
        ] }, key)
      ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: isSuperAdmin ? 10 : 5,
          className: "text-center text-destructive py-8",
          children: "Failed to load tests. Please try again."
        }
      ) }) : paginatedTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: isSuperAdmin ? 10 : 5,
          className: "text-center text-muted-foreground py-8",
          children: searchQuery ? "No tests match your search." : "No tests found. Add your first test."
        }
      ) }) : paginatedTests.map((test) => {
        const isToggling = togglingIds.has(test.id);
        const labCost = test.labCost ?? 0;
        const commissionPct = test.doctorCommission ?? 0;
        const mrpNum = Number(test.price);
        const profit = computeProfitPerTest(
          mrpNum,
          labCost,
          commissionPct
        );
        const profitColor = getProfitStatusColor(mrpNum, profit);
        const isLoss = profit < 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: `hover:bg-muted/30 transition-colors ${isLoss ? "bg-red-50" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: isSuperAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProfitDot, { color: profitColor }),
                test.name
              ] }) : test.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-xs", children: test.code }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: test.sampleType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatMRP(test.price) }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-muted-foreground", children: [
                "₹",
                labCost
              ] }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-muted-foreground", children: [
                commissionPct,
                "%"
              ] }),
              isSuperAdmin && (() => {
                const flatProfit = mrpNum - Number(labCost) - Number(commissionPct);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TableCell,
                  {
                    className: `text-right font-semibold ${flatProfit >= 0 ? "text-green-600" : "text-red-600"}`,
                    "data-ocid": `tests.profit.item.${paginatedTests.indexOf(test) + 1}`,
                    children: [
                      flatProfit >= 0 ? "+" : "",
                      "₹",
                      flatProfit.toFixed(0)
                    ]
                  }
                );
              })(),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestStatusBadge, { isActive: test.isActive }) }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: isToggling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: test.isActive,
                  onCheckedChange: (checked) => handleToggleStatus(test, checked),
                  "aria-label": `Toggle ${test.name} ${test.isActive ? "inactive" : "active"}`,
                  className: "data-[state=checked]:bg-emerald-500"
                }
              ) }) }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => handleEditClick(test),
                    title: "Edit test",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive hover:text-destructive",
                    onClick: () => handleDisableClick(test),
                    title: "Disable test",
                    disabled: !test.isActive,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }) })
            ]
          },
          test.id
        );
      }) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Showing ",
        (currentPage - 1) * PAGE_SIZE + 1,
        "–",
        Math.min(currentPage * PAGE_SIZE, filteredTests.length),
        " of",
        " ",
        filteredTests.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-8 w-8",
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2", children: [
          currentPage,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-8 w-8",
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddTestModal,
      {
        open: addModalOpen,
        onClose: () => setAddModalOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditTestModal,
      {
        open: editModalOpen,
        test: selectedTest,
        onClose: () => {
          setEditModalOpen(false);
          setSelectedTest(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DisableTestConfirmDialog,
      {
        open: disableDialogOpen,
        test: testToDisable,
        onClose: () => {
          setDisableDialogOpen(false);
          setTestToDisable(null);
        }
      }
    )
  ] });
}
export {
  TestManagementPage as default
};
