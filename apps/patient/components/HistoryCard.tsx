import React from "react";

interface HistoryCardProps {
    name: string;
    age: number;
}

export class HistoryCard extends React.Component<HistoryCardProps> {
    constructor(props: HistoryCardProps) {
        super(props);
    }

    render() {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center spacx-4 bg-teal-400">
                <h1 className="text-3xl font-bold">My name is {this.props.name}</h1>
                <h1 className="text-3xl font-bold">I am {this.props.age} years old.</h1>
            </div>
        )
    }
}