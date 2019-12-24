const Validation = {
    AlphaNumeric : /^[a-zA-Z0-9 ]+$/,
    Mobileregex  : /^[0]?[6789]\d{9}$/,
    Alphabets    : /^[a-zA-Z ]+$/,
    Numeric      : /[0-9 ]+/,
    emailRegex   : /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z ]{2,5})$/,
    panRegex     : /[A-Z]{5}[0-9]{4}[A-Z]{1}/
}

export default Validation;


