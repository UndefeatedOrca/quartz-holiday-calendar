import { QuartzComponent } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';

interface HolidayCalendarOptions {
    showUpcomingDays?: number;
}
declare const _default: (opts?: Partial<HolidayCalendarOptions>) => QuartzComponent;

export { _default as HolidayCalendar };
