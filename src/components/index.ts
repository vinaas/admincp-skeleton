import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        "./select2/index",
        "./datetime-picker/datatime-picker"
    ]);
}
