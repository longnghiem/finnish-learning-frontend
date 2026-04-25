import {useTopics} from "../hooks";
import {TopicCard} from "../components/TopicCard.tsx";

/**
 * Landing page displaying all Finnish learning topics in a responsive grid.
 *
 * Uses the {@link useTopics} hook to fetch topics from the backend.
 * Shows loading and error states while data is being fetched or if
 * the request fails.
 */
export function LandingPage() {
    const { data: topics, isLoading, isError } = useTopics();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-lg text-gray-500">Loading topics...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-lg text-red-500">Failed to load topics.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl px-6 py-10">
            <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
                Choose a topic
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topics?.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                ))}
            </div>
        </div>
    );
}