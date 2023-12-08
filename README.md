[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12905364&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.  

**Note:**  
As stated in class, the Held-Karp algorithm slows down to an extreme extent  
when running it for a matrix size of 19x19 or higher. As a result, I have stopped  
my graphs at a matrix size of 18x18

**Answer:**  
There are a multitude of conclusions that can be drawn by the graphs shown above,  
but none of them should be *too* surprising considering what the runtimes and purposes of  
each of these approaches is.  
First off, I will focus on the analysis of the runtimes. As can clearly be seen,  
the Local Search algorithm will run far *far* faster than the Held-Karp algorithm  
in practically all cases. The only exception to this was with smaller matrices where  
they both seemed to run at a similar rate. Such an outcome was completely expected,  
as the runtime for the Held-Karp algorithm is *leagues* slower than the runtime for  
the Local Search algorithm. This is because (as explained in the descriptions for my  
Held-Karp and Local Search programs) Held-Karp must go through each individual subset  
of cities in order to find the guaranteed fastest route, while the Local Search will  
only try $n^2$ different random combinations before taking the best one and moving on.  
As a result, the 18x18 matrix will take Held-Karp a full minute to complete while only  
taking Local Search a few milliseconds. However, the paths are *far* different in terms  
of quality.  
This brings me to my next graph, which is the analysis of the returned paths. Please note  
that for this project I used specialized matrices that were guaranteed to have a shortest  
path of n-1 where n is the amount of cities that are given to it. For more information on  
how I got about doing this, please refer to my WildCard Project. Regardless, the reason I  
bring this up is so we know the absolute shortest possible path that any matrix can give.  
This allows us to make sure that the Held-Karp algorithm is always getting the correct  
answer, and also helps us to compare said answer to the one gotten by Local Search.  
As expected, the path returned by the Held-Karp algorithm is consistently the shortest it  
can be. This is because, as stated above, it goes through all possible subsets in order  
to make sure that it has the shortest possible path. Local Search, on the other hand, is  
usually *very* far off from the actual shortest result. As can be seen on the graph, although  
it starts off pretty accurate, dealing with matrices of sizes 6 and above causes Local Search  
to return paths that are *far* from the true smallest distance. So all in all, the Local Search  
algorithm sacrifices accuracy for the sake of speed. After all, there can be no doubt that it  
is much faster than Held-Karp, but Held-Karp definitely has better results as it *always* returns  
the true shortest difference.  
Finally, to explicitly answer the question asked above, the reason why the length of the tour  
for Local Search cannot possibly be lower than the length of the tour returned by Held-Karp is  
because Held-Karp will definitively give us the smallest possible answer. As a result, Local  
Search (which only tries a few random combinations and takes the best one) cannot *possibly*  
give a better result than it. In fact, as shown in my graphs, it will often return a tour that  
is much worse when compared to Held-Karp, as how good of a result it gets in the end is almost  
entirely up to luck.
