/**
 * @license
 * Copyright 2021 Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import {PageSection, PageSectionVariants} from '@patternfly/react-core';
import {PageComponent, PageProps, PageState} from "../basePage";


/**
 * Properties
 */
// tslint:disable-next-line:no-empty-interface
export interface DashboardPageProps extends PageProps {

}

/**
 * State
 */
export interface DashboardPageState extends PageState {
}

/**
 * The dashboard page.
 */
export class DashboardPage extends PageComponent<DashboardPageProps, DashboardPageState> {

    // eslint-disable-next-line
    constructor(props: Readonly<DashboardPageProps>) {
        super(props);
    }

    public renderPage(): React.ReactElement {
        return (
            <React.Fragment>
                <PageSection className="ps_dashboard-header" variant={PageSectionVariants.light}>
                    <h2>Page Header</h2>
                </PageSection>
                <PageSection variant={PageSectionVariants.default} isFilled={true}>
                    <p>
                        Maecenas finibus lectus congue ultricies lacinia. Donec ultrices vestibulum eros quis imperdiet.
                        Aenean ac tristique lectus. Ut condimentum malesuada velit, eget viverra odio vehicula sed.
                        Suspendisse cursus dapibus varius. In ut sapien vestibulum, malesuada nisi a, commodo mauris.
                        Donec turpis sapien, tempus vel velit ut, dapibus porttitor nulla. Sed dictum mi in dui maximus
                        placerat. Vestibulum erat sem, tincidunt nec turpis in, placerat finibus odio. Pellentesque
                        bibendum tellus eget volutpat hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus
                        et ultrices posuere cubilia curae; Nullam in urna sapien. Ut non volutpat sapien, quis malesuada
                        leo. In molestie ullamcorper metus ac pulvinar.
                    </p>
                </PageSection>
            </React.Fragment>
        );
    }

    protected doInitializeState(): DashboardPageState {
        return {};
    }
}
