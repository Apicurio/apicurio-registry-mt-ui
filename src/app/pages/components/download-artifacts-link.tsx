import { RhosrService } from "@app/services";
import { Registry } from "@rhoas/registry-management-sdk";
import React, { Fragment } from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { Text, TextVariants } from "@patternfly/react-core";

export type DownloadArtifactsLinkProps = {
    getExportDownloadUrlForRegistry: (instance: Registry) => Promise<string>
    instance: Registry
    label: string
};

export const DownloadArtifactsLink: FunctionComponent<DownloadArtifactsLinkProps> = ({ getExportDownloadUrlForRegistry, instance, label }: DownloadArtifactsLinkProps) => {
    const [href, setHref] = useState<string>();

    useEffect(() => {
        getExportDownloadUrlForRegistry(instance).then(hrf => {
            setHref(hrf)
            console.log(hrf)
        })
    }, [getExportDownloadUrlForRegistry, instance])

    if (!href) return <Fragment />

    return (
        <Text component={TextVariants.a} href={`${instance.registryUrl}${href}/${instance.name}`}>
            {label}
        </Text>
    )
}