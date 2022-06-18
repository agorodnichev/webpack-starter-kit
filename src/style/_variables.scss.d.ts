/**
 * Allows to import scss variables and css modules dynamic class names
 * to typescript.
 */
export interface I_variablesScss {
    baseColor: string;
    greyColor: string;
    smallDevicesBreakpoint: string;
    mediumDevicesBreakpoint: string;
    largeDevicesBreakpoint: string;
    extraLargeDevicesBreakpoint: string;
    foo: string;
}

export const styles: I_variablesScss;

export default styles;