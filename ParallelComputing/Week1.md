# Lecture 2
* With all these dependencies, your main goal is mind whether I can reorder two instructions. If there exist dependencies then you may be able to.

## Finding Data Dependencies
* There may be direct data dependencies, or transitive.
* The transitive dependencies may extend to the length of the entire program. As the length of these dependencies increases, it becomes more and more difficult for us to find independent instructions.

## Data Dependencies through Registers/Memory
* Detecting dependencies through memory are harder, because it can not be detected at Compile Time. The values stored in the registers (r2, r4) in the example shown depend on the control flow of the program. Hence such dependencies need to detected at Run Time, and need HW/Compiler support.
* Data Dependencies cause RAW Hazards.

## Name Dependencies
* These dependencies are different from the Data Dependencies, because you don't have a direct data transfer from a preceding instruction's output to the next's input.
* If there exists a Read after Write Anti-Dependence, then you won't be able to reorder the instructions. In the example, you can't move J before I. Termed as WAR dependency. 
* There also exist WAW dependency, wherein you can't move the later instruction which writes to a register before an instruction which also writes to the same register.
* These dependencies may be solved via Register Renaming.

## ILP and Data Hazards
* The main goal of reordering is to enhance parallelism, while maintain the original program execution order. You must not remove the true data dependencies.

## Constraints to Reordering
When reordering instructions, there are two rules you must conform to.
### Preserve Exception Behaviour
* Reordering instructions must not cause any exceptions (Null pointers, Seg Faults etc.).
* In the given example, by reordering the Load instruction above the Branch, you're assuming that (0+R2) is a valid memory reference.

### Preserve Data Flow
* The values of the registers obtained in the reordered execution must be the same as in the original flow of execution.
* In the example given, (2, 3) share no common registers/dependencies. However, moving 3 above 2, leads to the OR statement, to always receive the DSUBU result, irrespective of whether the branch was taken or not.

## Basic Compiler Techniques
### Loop Carried Dependence
* Loops are easiest to parallelize because you have the same code repeating over and over, and you can run all iterations in parallel. This may not always be possible though, sometimes your later iteration may depend on the output of previous iterations. This is called a Loop Carried Dependence. 

`doubt`: Didn't understand how the Stall Table came to be.

### Loop Unrolling
* Aims to resolve the Loop Overhead associated with each iteration of the loop. The main issue is that there exist stalls in the iteration, but no independent instructions to replace that stall with. So how about we bring in instructions from the next iteration.
`doubt`: We will only be able to unroll this way if are loop is a multiple of 4 right?

# Lecture 3
* **Speculation** refers to bringing instructions from other Basic Blocks in order to reduce the number of stalls, and increase ILP.
* Pipeline throughput depends on the slowest stage, which is why successive processor iterations, try to reduce the time for each stage, and split it across an increased number of stages.
* The problem with deep pipelines, however, arises in the case of mispredictions, because there is (now) a greater number of instructions to be flushed.
* With a single pipeline, the maximum achievable CPI is 1. In order to execute more than 1 instruction on every clock cycle, we may employ **multiple pipelines**.
* With a 2-way super scalar execution, we would be able to send one instruction to one pipeline, and another to the second. These instructions must be independent, because we wouldn't be able to execute two instructions in parallel, if one depended on the output of another. Superscalar exec. requires duplication of hardware.
* **Multiple Issue processors** may be Static or Dynamic.
* The advantages of Static MIP is that it has a larger view of the code.
* The adv. of Dynamic MIP is that the Hardware has the Branch History, which allows is to perform Dynamic Branch prediction. This is not possible at the compiler level. The HW is also able to take better decisions for scheduling based on whether a particular instruction is a cache hit or a cache miss. This info. is not available at the Static Level.
* VLIW also requires the Compiler to bunch the parallel instructions together.

## Multithreading
* A limitation of MIP is that if you're unable to find parallel instructions, then you will encounter stalls no matter what.
* Multithreading gives the impression to the Operating System that there are multiple CPUs when actually *there's only one*.
* This allows the OS to schedule one process on each **virtual CPU** that it sees. To the actual CPU this has the effect that now there's multiple streams of instructions which it is supposed to run.
* Hence, now when a CPU is unable to reorder instructions in order to remove stalls, it may simply run instructions from the other stream. Since, these are two separate processes, they are much more likely to be independent. There may be cases when they are concurrently accessing some shared resource, but that's a small possibility.
* Multithreading also optimizes Cache Miss Waits.
* A Multithreaded CPU must provided ways to store the status of each process, because now there's multiple Program Counters.
* Coarse-grained Multithreading wastes clock cycles, as you'll only commence switching when a stall happens. The switching also consumes some clock cycles.
* **Simultaneous Multithreading** refers to implementing both ILP and TLP.

## Memory Heirarchy
* 
