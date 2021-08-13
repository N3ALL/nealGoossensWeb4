
import { Pipe, PipeTransform } from "@angular/core";
import { Topic } from "./topic/topic.model";


@Pipe({
    name: 'titlePipe'
})
export class TopicFilterPipe implements PipeTransform {
    transform(topics: Topic[], title: string): Topic[] {
        if (!title || title.length === 0) {
            return topics;
        }
        return topics.filter(t => t.title.toLowerCase().startsWith(title.toLowerCase()))
    };
}
