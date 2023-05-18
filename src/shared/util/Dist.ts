export function dist(part0: Part, part1: Part): number {
    return part0.Position.sub(part1.Position).Magnitude
}