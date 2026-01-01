import { useEffect, useState, type JSX } from "react";
import styles from "./Counter.module.css"
import { increment, decrement, incrementAsync, incrementByAmount, incrementIfOdd, selectCount, selectStatus, } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLazyProductDetailQuery, useProductDetailQuery, useProductsListQuery } from "@/services/productApi";

export function Counter(): JSX.Element {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const status = useAppSelector(selectStatus);
    const [incrementAmount, setIncrementAmount] = useState<string>("2");

    const incrementValue = Number(incrementAmount) || 0;
    // const { data, isLoading } = useProductsListQuery({});
    const [triggerProductDetail, { data, isFetching }] = useLazyProductDetailQuery();
    // useEffect(() => {
    //     if (!isLoading) {
    //         console.log(data);
    //     }
    // }, [data])

    useEffect(() => {
        // if (!isFetching) {
        console.log('isFetching: ', isFetching);
        console.log(data);
        // }
    }, [data])

    return <div>
        <button onClick={() => triggerProductDetail("1")} >Get Product 1</button>
        {/* Row of input + -  collection */}
        <div className={styles.row}>
            <button className={styles.button}
                aria-label="Decrement Value"
                onClick={() => dispatch(decrement())}>
                -
            </button>
            <span aria-label="Count" className={styles.value}>
                {count}
            </span>
            <button className={styles.button}
                aria-label="Increment Value"
                onClick={() => dispatch(increment())}>
                +
            </button>
        </div>
        <div className={styles.row} >
            {/* Input add and button */}
            {/* <label htmlFor="incrementAmount">Increment Amount </label> */}
            <input type="string" id="incrementAmount" className={styles.textbox} aria-label="Increment Amount " value={incrementAmount}
                onChange={event => setIncrementAmount(event.target.value)} />
            <button className={styles.button}
                aria-label="Increment By Amount"
                onClick={() => dispatch(incrementByAmount(incrementValue))} >
                Add
            </button>
        </div>
        <div className={styles.row}>
            {/* buttons collection */}
            <button className={styles.asyncButton}
                aria-label="Add Async Increment"
                onClick={() => dispatch(incrementAsync(incrementValue))}
                disabled={status !== "idle"}>
                Add Async
            </button>
            <button className={styles.oddButton}
                aria-label="Add If Odd"
                onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                Add If Odd
            </button>
        </div>
    </div>
}