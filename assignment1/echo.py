def echo(text: str, repetitions: int = 3) -> str:
    echo = ""
    for i in range(repetitions):
        echo += text[len(text)-repetitions+i:] + "\n"

    echo += "."
    return echo

if __name__ == "__main__":
    text = input("Yell something at a mountain: ")
    print(echo(text))