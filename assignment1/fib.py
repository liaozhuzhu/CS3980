from functools import lru_cache
import time
import matplotlib.pyplot as plt

times = []
ns = []

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    start = time.time()

    if n < 2:
        result = n  
    else:
        result = fib(n-1) + fib(n-2)

    end = time.time()
    elapsed_time = end - start
    print(f"Finished in {elapsed_time:.8f}s: fib({n}) -> {result}")

    ns.append(n)
    times.append(elapsed_time)

    return result

if __name__ == "__main__":
    fib(100)

    plt.figure(figsize=(10, 5))
    plt.plot(ns, times, linestyle="-", color="b", linewidth=2)
    plt.xlabel("n (Fibonacci number)")
    plt.ylabel("Time taken (seconds)")
    plt.title("Time Complexity of Fibonacci Calculation with Memoization")
    plt.grid()
    plt.show()
