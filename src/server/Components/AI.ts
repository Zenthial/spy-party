import { CollectionService, Workspace, PathfindingService } from "@rbxts/services"
import { tcs, Component } from "@rbxts/tcs"
import { AnimationController } from "./AnimationController";
import { TalkingCircle } from "./World/TalkingCircle";

enum Action {
    Idle,
    Walk,
    InspectBook,
    InspectStatue,
    CheckWatch,
    EnterConversation,
    Talk,
    Interrupt
}

class AI extends Component {
    static TAG = "AI"
    INSTANCE: Instance = Workspace
    Controller!: AnimationController
    CurrentAction: Action

    constructor(root: Instance) {
        super(root);
        this.CurrentAction = Action.Idle;
    }

    public start() {
        CollectionService.AddTag(this.Root, "AnimationController");
        this.Controller = tcs.await_component<AnimationController>(this.Root, AnimationController);
        this.runtime_loop();
    }

    private runtime_loop() {
        const map = Workspace.WaitForChild("Map") as Model
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const action = this.determine_action(map)
            switch (action) {
                case Action.Idle: {
                    this.Controller.play_animation("Idle")
                    task.wait(math.random(1, 5))
                    break;
                }
                default: {
                    print("default");
                }
            }
        }
    }

    private pathfind(action: Action) {
        if (action === Action.EnterConversation) {
            const talking_circles = CollectionService.GetTagged("TalkingCircles") 
            for (const circle of talking_circles) {
                const circle_component = tcs.await_component<TalkingCircle>(circle, TalkingCircle)
            }

        }
        const bookshelves = CollectionService.GetTagged("Bookshelves")
        const statues = CollectionService.GetTagged("Statues")


    }

    private determine_action(map: Model): Action {
        return Action.Idle
    }

    public destroy() {
        
    }
}

tcs.create_component(AI)