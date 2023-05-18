import {tcs, Component} from "@rbxts/tcs"
import { Character } from "shared/types/Character"

function find_animator(char: Character): Animator {
    for (const obj of char.GetDescendants()) {
        if (obj.IsA("Animator")) {
            return obj as Animator
        }
    }

    error("no animator found for " + char.Name)
}

export class AnimationController extends Component {
    static TAG = "AnimationController"
    Character: Character
    Folder: Folder
    Animator!: Animator
    Tracks: Map<String, AnimationTrack>

    constructor(root: Instance) {
        super(root)
        this.Character = this.Root as Character
        this.Folder = new Instance("Folder")
        this.Folder.Parent = this.Root

        this.Tracks = new Map();
    }

    public start() {
        const animator = find_animator(this.Character) 
        this.Animator = animator
    }

    public load_animation(animation: Animation) {
        animation.Parent = this.Folder

        const track = this.Animator.LoadAnimation(animation)
        this.Tracks.get(animation.Name)?.Stop()
        this.Tracks.set(animation.Name, track)
    }

    public play_animation(animation_name: string): AnimationTrack {
        const track = this.Tracks.get(animation_name)
        if (track !== undefined) {
            track.Play()

            return track
        } else {
            error(`Animation track ${animation_name} does not exist for ${this.Root.Name}`)
        }
    }

    public stop_animation(animation_name: string){
        this.Tracks.get(animation_name)?.Stop()
    }

    public is_playing(animation_name: string): boolean {
        return this.Tracks.get(animation_name)?.IsPlaying || false
    }

    public destroy() {
        
    }
}

tcs.create_component(AnimationController)