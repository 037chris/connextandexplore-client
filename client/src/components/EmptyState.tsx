import Heading from "./Heading";
import Button from "./Button";

// interface EmptyState {
//     title?: string;
//     subtitle?: string;
// }


const EmptyState = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
   
}) => {

  return (
    <div className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
        font-titan
    ">
        <Heading
            center
            title={title}
            subtitle={subtitle}
        />
       
    </div>
  )
}

export default EmptyState