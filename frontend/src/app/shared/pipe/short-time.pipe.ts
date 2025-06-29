import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shortTime',
    standalone: true
})

export class ShortTimePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';
        const [hours, minutes] = value.split(':');
        if(minutes === '00') {
            return `${hours}H`;
        }
        return `${hours}H${minutes}`;
    }

}