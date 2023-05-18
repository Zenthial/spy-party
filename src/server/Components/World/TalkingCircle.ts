import { tcs, Component } from "@rbxts/tcs"

interface Spot {
    Occupied: boolean,
    Location: Part,
    Index: number,
}

export class TalkingCircle extends Component {
    static TAG = "TalkingCircle"
    Spots: Spot[] = []

    constructor(root: Instance) {
        super(root)
    }

    public start() {
        let i = 0;
        for (const spot of this.Root.WaitForChild("Spots").GetChildren()) {
            this.Spots.push({
                Occupied: false,
                Location: spot as Part,
                Index: i
            })
            i++;
        }
    }

    public get_open_spot() {
        for (const spot of this.Spots) {
            if (!spot.Occupied) {
                return $tuple(spot.Location.Position, spot.Index)
            }
        }

        return undefined
    }

    public enter_spot(){}

    public destroy() {
        
    }
}

tcs.create_component(TalkingCircle)