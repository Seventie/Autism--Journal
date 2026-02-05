import React from 'react';

interface QuoteProps {
    initialQuote?: string;
}

interface QuoteState {
    quote: string;
}

class QuoteDisplay extends React.Component<QuoteProps, QuoteState> {
    state: QuoteState = {
        quote: this.props.initialQuote || "You are doing great!",
    };

    componentDidMount() {
        console.log("QuoteDisplay mounted");
    }

    changeQuote = () => {
        const quotes = [
            "Every step counts!",
            "Breathe in, breathe out.",
            "You are enough.",
            "Today is a new adventure.",
            "Your feelings differ, and that's okay."
        ];

        const randomQuote =
            quotes[Math.floor(Math.random() * quotes.length)];

        this.setState({ quote: randomQuote });
    };

    render() {
        return (
            <div className="mt-8 text-center p-6 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                <p className="text-xl font-handwritten text-yellow-600 mb-4">
                    "{this.state.quote}"
                </p>
                <button
                    onClick={this.changeQuote}
                    className="text-sm font-bold text-yellow-500 hover:text-yellow-600 underline"
                >
                    New Quote (Class Component Demo)
                </button>
            </div>
        );
    }
}

export default QuoteDisplay;
