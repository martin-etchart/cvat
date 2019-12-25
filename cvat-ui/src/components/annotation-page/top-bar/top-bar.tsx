import React from 'react';

import {
    Row,
    Col,
    Icon,
    Slider,
    Layout,
    Input,
    Tooltip,
    Select,
} from 'antd';

import { SliderValue } from 'antd/lib/slider';
import Text from 'antd/lib/typography/Text';

import {
    MainMenuIcon,
    SaveIcon,
    UndoIcon,
    RedoIcon,
    PlaycontrolFirstIcon,
    PlaycontrolBackJumpIcon,
    PlaycontrolPreviousIcon,
    PlaycontrolPlayIcon,
    PlaycontrolPauseIcon,
    PlaycontrolNextIcon,
    PlaycontrolForwardJumpIcon,
    PlaycontrolLastIcon,
    InfoIcon,
    FullscreenIcon,
} from '../../../icons';


interface Props {
    jobInstance: any;
    frame: number | null;
    playingTimeout: number | null;
    onChangeFrame(frame: number): void;
    onPlay(playing: boolean): void;
}

export default function AnnotationPageComponent(props: Props): JSX.Element {
    const {
        jobInstance,
        frame,
        playingTimeout,
        onChangeFrame,
        onPlay,
    } = props;

    if (frame === null) {
        onChangeFrame(jobInstance.startFrame);
    }

    return (
        <Layout.Header className='cvat-annotation-page-header'>
            <Row type='flex' justify='space-between'>
                <Col className='cvat-annotation-header-left-group'>
                    <div className='cvat-annotation-header-button'>
                        <Icon component={MainMenuIcon} />
                        <span>Menu</span>
                    </div>
                    <div className='cvat-annotation-header-button'>
                        <Icon component={SaveIcon} />
                        <span>Save</span>
                    </div>
                    <div className='cvat-annotation-header-button'>
                        <Icon component={UndoIcon} />
                        <span>Undo</span>
                    </div>
                    <div className='cvat-annotation-header-button'>
                        <Icon component={RedoIcon} />
                        <span>Redo</span>
                    </div>
                </Col>
                <Col className='cvat-annotation-header-player-group'>
                    <Row type='flex' align='middle'>
                        <Col className='cvat-annotation-header-player-buttons'>
                            <Tooltip overlay='Go to the first frame'>
                                <Icon
                                    component={PlaycontrolFirstIcon}
                                    onClick={(): void => {
                                        if (frame !== null) {
                                            onPlay(false);
                                            if (jobInstance.startFrame !== frame) {
                                                onChangeFrame(jobInstance.startFrame);
                                            }
                                        }
                                    }}
                                />
                            </Tooltip>
                            <Tooltip overlay='Go back with a step'>
                                <Icon
                                    component={PlaycontrolBackJumpIcon}
                                    onClick={(): void => {
                                        if (frame !== null) {
                                            onPlay(false);
                                            const newFrame = Math
                                                .max(jobInstance.startFrame, frame - 10);
                                            if (newFrame !== frame) {
                                                onChangeFrame(newFrame);
                                            }
                                        }
                                    }}
                                />
                            </Tooltip>
                            <Tooltip overlay='Go back'>
                                <Icon
                                    component={PlaycontrolPreviousIcon}
                                    onClick={(): void => {
                                        if (frame !== null) {
                                            onPlay(false);
                                            const newFrame = Math
                                                .max(jobInstance.startFrame, frame - 1);
                                            if (newFrame !== frame) {
                                                onChangeFrame(newFrame);
                                            }
                                        }
                                    }}
                                />
                            </Tooltip>

                            {playingTimeout === null
                                ? (
                                    <Tooltip overlay='Play'>
                                        <Icon
                                            component={PlaycontrolPlayIcon}
                                            onClick={(): void => {
                                                if (frame !== null) {
                                                    onPlay(true);
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                )
                                : (
                                    <Tooltip overlay='Pause'>
                                        <Icon
                                            component={PlaycontrolPauseIcon}
                                            onClick={(): void => {
                                                if (frame !== null) {
                                                    onPlay(false);
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                )
                            }

                            <Tooltip overlay='Go next'>
                                <Icon
                                    component={PlaycontrolNextIcon}
                                    onClick={(): void => {
                                        if (frame !== null) {
                                            onPlay(false);
                                            const newFrame = Math
                                                .min(jobInstance.stopFrame, frame + 1);
                                            if (newFrame !== frame) {
                                                onChangeFrame(newFrame);
                                            }
                                        }
                                    }}
                                />
                            </Tooltip>
                            <Tooltip overlay='Go next with a step'>
                                <Icon
                                    component={PlaycontrolForwardJumpIcon}
                                    onClick={(): void => {
                                        if (frame !== null) {
                                            onPlay(false);
                                            const newFrame = Math
                                                .min(jobInstance.stopFrame, frame + 10);
                                            if (newFrame !== frame) {
                                                onChangeFrame(newFrame);
                                            }
                                        }
                                    }}
                                />
                            </Tooltip>
                            <Tooltip overlay='Go to the last frame'>
                                <Icon
                                    component={PlaycontrolLastIcon}
                                    onClick={(): void => {
                                        if (frame !== null) {
                                            onPlay(false);
                                            if (jobInstance.stopFrame !== frame) {
                                                onChangeFrame(jobInstance.stopFrame);
                                            }
                                        }
                                    }}
                                />
                            </Tooltip>
                        </Col>
                        <Col className='cvat-annotation-header-player-controls'>
                            <Row type='flex'>
                                <Col>
                                    <Slider
                                        className='cvat-annotation-header-player-slider'
                                        min={jobInstance.startFrame}
                                        max={jobInstance.stopFrame}
                                        value={frame || 0}
                                        onChange={(value: SliderValue): void => {
                                            if (frame !== null) {
                                                onPlay(false);
                                                onChangeFrame(value as number);
                                            }
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row type='flex' justify='space-around'>
                                <Col className='cvat-annotation-header-filename-wrapper'>
                                    <Tooltip overlay='filename.png'>
                                        <Text type='secondary'>filename.png</Text>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Input
                                className='cvat-annotation-header-frame-selector'
                                type='number'
                                value={frame || 0}
                                // https://stackoverflow.com/questions/38256332/in-react-whats-the-difference-between-onchange-and-oninput
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                    if (frame !== null) {
                                        onPlay(false);
                                        onChangeFrame(+e.target.value || jobInstance.startFrame);
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col className='cvat-annotation-header-right-group'>
                    <div className='cvat-annotation-header-button'>
                        <Icon component={FullscreenIcon} />
                        <span>Fullscreen</span>
                    </div>
                    <div className='cvat-annotation-header-button'>
                        <Icon component={InfoIcon} />
                        <span>Info</span>
                    </div>
                    <div>
                        <Select className='cvat-annotation-header-workspace-selector' defaultValue='standard'>
                            <Select.Option key='standard' value='standard'>Standard</Select.Option>
                            <Select.Option key='aam' value='aam'>Attribute annotation</Select.Option>
                        </Select>
                    </div>
                </Col>
            </Row>
        </Layout.Header>
    );
}
