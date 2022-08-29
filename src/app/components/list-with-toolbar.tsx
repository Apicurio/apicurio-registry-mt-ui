import React, { FunctionComponent } from "react";
import { IsLoading } from "@app/components/is-loading";
import { If } from "@app/components/if";

/**
 * Properties
 */
export type ListWithToolbarProps = {
    toolbar: React.ReactNode;
    alwaysShowToolbar?: boolean;
    emptyState: React.ReactNode;
    filteredEmptyState?: React.ReactNode;
    isLoading: boolean;
    isFiltered: boolean;
    isEmpty: boolean;
    isError: boolean;
    errorComponent: React.ReactNode;
    loadingComponent?: React.ReactNode;
    children?: React.ReactNode;
};

/**
 * Wrapper around a set of arbitrary child elements and displays them only if the
 * indicated condition is true.
 */
export const ListWithToolbar: FunctionComponent<ListWithToolbarProps> = (
    {
        toolbar,
        alwaysShowToolbar,
        emptyState,
        filteredEmptyState,
        isLoading,
        loadingComponent,
        isError,
        errorComponent,
        isEmpty,
        isFiltered,
        children
    }: ListWithToolbarProps) => {

    return (
        <React.Fragment>
            <If condition={alwaysShowToolbar || !isEmpty || isFiltered} children={toolbar}/>
            <IsLoading condition={isLoading} loadingComponent={loadingComponent}>
                <If condition={isError} children={errorComponent}/>
                <If condition={!isError && !isEmpty} children={children}/>
                <If condition={!isError && isEmpty && isFiltered} children={filteredEmptyState}/>
                <If condition={!isError && isEmpty && !isFiltered} children={emptyState}/>
            </IsLoading>
        </React.Fragment>
    );
};
