import React from 'react';
import EventEmitter from 'events';
import { DataSourceController, Option } from './smart-suggests';

interface Params<T extends Option> {
  dataSourceController: DataSourceController<T>;
  dropdownOptionsContainerRef?: React.MutableRefObject<HTMLDivElement>;
}

export class KeyboardSuggestsController<T extends Option> extends EventEmitter {
  protected dropdownOptionsContainerRef?: React.RefObject<HTMLDivElement>;
  protected dataSourceController: DataSourceController<T>;
  protected hoveredOptionIndex = 0;

  constructor({
    dropdownOptionsContainerRef,
    dataSourceController,
  }: Params<T>) {
    super();
    this.dropdownOptionsContainerRef = dropdownOptionsContainerRef;
    this.dataSourceController = dataSourceController;
  }

  get hoveredOptionKey(): string {
    return (
      this.dataSourceController.options[this.hoveredOptionIndex]?.key || ''
    );
  }
  onArrowUp = () => {
    this.hoveredOptionIndex =
      (this.hoveredOptionIndex - 1 + this.dataSourceController.options.length) %
      this.dataSourceController.options.length;
    this.emit('update');
  };
  onArrowDown = () => {
    this.hoveredOptionIndex =
      (this.hoveredOptionIndex + 1) % this.dataSourceController.options.length;
    this.emit('update');
  };
  setDropdownOptionsContainerRef = (ref: React.RefObject<HTMLDivElement>) => {
    this.dropdownOptionsContainerRef = ref;
    this.emit('update');
  };
}
