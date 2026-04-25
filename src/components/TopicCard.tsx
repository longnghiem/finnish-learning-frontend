import type {TopicResponse} from "../types";
import {Link} from "react-router-dom";
import {topicImages} from "../assets/topics";

interface TopicCardProps {
    topic: TopicResponse;
}

/**
 * A clickable card representing a single Finnish learning topic.
 */
export function TopicCard({ topic }: TopicCardProps) {
    return (
        <Link
            to={`/topics/${topic.id}`}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
        >
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={topicImages[topic.id]}
                    alt={topic.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="px-4 py-3">
                <h2 className="text-center text-lg font-semibold text-gray-800">
                    {topic.name}
                </h2>
            </div>
        </Link>
    );
}