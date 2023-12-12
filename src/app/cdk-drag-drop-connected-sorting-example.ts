import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-example.css'],
})
export class CdkDragDropConnectedSortingExample {
  jobs = [
    {
      jobId: 0,
      jobName: 'Free Positions',
      isDummy: false,
      isPosChanged: false,
      positions: [
        {
          name: 'ArbeitPosition',
          positionId: 0,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
        {
          name: 'paket1',
          positionId: 1,
          type: 'pkt',
          paketInfo: 'paket1',
          parentPaketId: 0,
        },
        {
          name: 'paket1 Position 1',
          positionId: 2,
          type: 'pktpos',
          parentPaketId: 1,
          paketInfo: 'paket1',
        },
        {
          name: 'paket1 Position 2',
          positionId: 3,
          type: 'pktpos',
          parentPaketId: 1,
          paketInfo: 'paket1',
        },
        {
          name: 'Spare part',
          positionId: 4,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
        {
          name: 'Outside position',
          positionId: 5,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
        {
          name: 'Paket2',
          positionId: 6,
          type: 'pkt',
          paketInfo: 'Paket2',
          parentPaketId: 0,
        },
        {
          name: 'Paket 2 Position1',
          positionId: 7,
          type: 'pktpos',
          parentPaketId: 6,
          paketInfo: 'Paket2',
        },
        {
          name: 'Paket 2 Position2',
          positionId: 8,
          type: 'pktpos',
          parentPaketId: 6,
          paketInfo: 'Paket2',
        },
        {
          name: 'Position 8',
          positionId: 9,
          type: 'pos',
          paketInfo: '',
          parentPaketId: 0,
        },
      ],
    },
  ];

  indicesWithNonEmptyPaketInfo: number[] = [];
  drop(event: CdkDragDrop<Position[]>) {
    if (event.previousContainer === event.container) {
      if (event.item.data.type == 'pkt') {
        if (event.item.data.name === event.item.data.paketInfo) {
          this.indicesWithNonEmptyPaketInfo = this.getIndexValue(
            event.container.data
          );
          const isValid = this.isValidMove(
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
          // down
          if (event.previousIndex > event.currentIndex) {
            //  console.log(event.previousContainer.data);
            for (let i = 0; i <= 2; i++) {
              // console.log(
              //   'i am here',
              //   event.previousIndex + i,
              //   event.currentIndex + i
              // );
              if (isValid) {
                moveItemInArray(
                  event.container.data,
                  event.previousIndex + i,
                  event.currentIndex + i
                );
              }
            }
          } else {
            // up
            for (let i = 0; i <= 2; i++) {
              if (isValid) {
                moveItemInArray(
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex
                );
              }
            }
          }
        }
      } else {
        this.indicesWithNonEmptyPaketInfo = this.getIndexValue(
          event.container.data
        );

        const isValid = this.isValidMove(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        if (isValid) {
          moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );

          // Use the map function to update the positions array for the specified job
          this.indicesWithNonEmptyPaketInfo = this.getIndexValue(
            event.container.data
          );
        }
      }
    } else {
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      // const isValid = this.isValidJobMove(
      //   event.previousContainer.data,
      //   event.previousIndex,
      //   event.currentIndex,
      //   event.item.data
      // );
      if (event.item.data.type == 'pkt') {
        for (let i = 0; i <= 2; i++) {
          // console.log('i am here', event.previousIndex, event.currentIndex);

          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );

          event.container.data.sort((a, b) =>
            a.type === 'pkt' ? -1 : b.type === 'pkt' ? 1 : 0
          );

          // if (isValid) {
          //   console.log('move');
          // } else {
          //   console.log('not move');
          // }
        }
      } else {
        const isValid = this.isValidJobMove(
          event.container.data,
          event.previousIndex,
          event.currentIndex,
          event.item.data
        );
        // if (isValid) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        // }
      }
    }
    // console.log('All Jobs', this.jobs);
  }

  dropJobs(event: any) {
    const isValid = this.isValidMove(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    if (event.previousContainer === event.container) {
      if (isValid) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      if (isValid) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  AddJObs(event: any) {
    let count = this.jobs.length;
    this.jobs.unshift({
      jobId: count,
      jobName: event.name,
      positions: [],
      isDummy: event.isDummy,
      isPosChanged: false,
    });
  }

  sortPredicate(index: number, item: CdkDrag<Position>) {
    // console.log('evenPredicate Index ', index, 'item ', item.data);
    return true;
  }
  onDeleteJob(jobId: number) {

// new code

// Find the index of the job in the array based on job ID
const indexToDelete = this.jobs.findIndex(job => job.positions.length === 0);

// 1. Check if the "positions" array in the job has any data.
if (indexToDelete !== -1) {
  // 2. If the "positions" array is empty, delete the job from the array based on its job ID.
  console.log(`Deleting job with ID ${this.jobs[indexToDelete].jobId}`);
  this.jobs.splice(indexToDelete, 1);
} else {
  // 3. If the "positions" array has data, find the minimum position ID and set the job ID to -1.
  const jobData = this.jobs.find(job => job.positions.length > 0);
  if (jobData) {
    const minPositionId = Math.min(...jobData.positions.map(position => position.positionId));
    jobData.jobId = -1;

     // Find the job with the specified jobId
     const jobToDelete = this.jobs.find((job) => job.jobId === -1);
 //  Check if the job to delete exists
    if (jobToDelete) {
      // Find or create the job with jobId 0
      const jobWithId0 = this.jobs.find((job) => job.jobId === 0) || {
        jobId: 0,
        jobName: 'Free Positions',
        isDummy: false,
        isPosChanged: false,
        positions: [],
      };

      // Move positions from the job to delete to the job with jobId 0
      jobWithId0.positions.push(...jobToDelete.positions);

      // Remove the job with the specified jobId
      this.jobs = this.jobs.filter((job) => job.jobId !==-1);

      // Log the updated jobs array
      console.log(this.jobs);
    } else {
      // Handle the case where no job with the specified jobId is found
      console.log(`Job with jobId ${jobId} not found`);
    }

    console.log(`Setting job ID to -1. Minimum position ID: ${minPositionId}`);
  }
}

// Now, jobsArray has been modified based on the conditions.
console.log('Updated Jobs Array:', this.jobs);

// End



    // // Check if the job to delete exists
    // if (jobToDelete) {
    //   // Find or create the job with jobId 0
    //   const jobWithId0 = this.jobs.find((job) => job.jobId === 0) || {
    //     jobId: 0,
    //     jobName: 'Free Positions',
    //     isDummy: false,
    //     isPosChanged: false,
    //     positions: [],
    //   };

    //   // Move positions from the job to delete to the job with jobId 0
    //   jobWithId0.positions.push(...jobToDelete.positions);

    //   // Remove the job with the specified jobId
    //   this.jobs = this.jobs.filter((job) => job.jobId !== jobId);

    //   // Log the updated jobs array
    //   console.log(this.jobs);
    // } else {
    //   // Handle the case where no job with the specified jobId is found
    //   console.log(`Job with jobId ${jobId} not found`);
    // }
  }
  isValidMove(arr: any, currentIndex: number, targetIndex: number) {
    // Extract types and additional information from the current and target positions
    const currentType = arr[currentIndex].type;
    const targetType = arr[targetIndex].type;
    const currPaketInfo = arr[currentIndex].paketInfo;
    const targetPacketInfo = arr[targetIndex].paketInfo;
    const targetParentPaketId = arr[targetIndex].parentPaketId;

    // Adjust the target index based on its type ('pkt' or 'pktpos')
    let target = targetIndex;
    if (targetType === 'pkt' || targetType === 'pktpos') {
      target = targetIndex + 1;
    } else {
      target = targetIndex;
    }

    // Check if the move is within the bounds of the array
    if (
      currentIndex < 0 ||
      currentIndex >= arr.length ||
      targetIndex < 0 ||
      targetIndex >= arr.length
    ) {
      console.log('Invalid move: Index out of bounds');
      return false;
    }

    // Check conditions for invalid moves

    // Condition: Moving a 'pos' to a forward 'pkt' position is not allowed
    if (
      targetIndex > currentIndex &&
      targetType === 'pkt' &&
      currentType === 'pos'
    ) {
      this.showInvalidMoveAlert();
      return false;
    }

    // Condition: Moving a 'pos' to a backward 'pkt' position is allowed
    if (
      targetIndex < currentIndex &&
      targetType === 'pkt' &&
      currentType === 'pos'
    ) {
      return true;
    }

    // Condition 1: Moving backward into a 'pkt' position or 'pktpos'
    if (
      (currentIndex > targetIndex &&
        currentType === 'pos' &&
        targetType === 'pkt') ||
      targetType === 'pktpos'
    ) {
      // Get the last index of the target type with the same parent paket ID
      const lastIndex = this.findLastElementIndex(
        arr,
        targetType,
        targetParentPaketId
      );

      // Allow the move only if it's the last index and types match
      if (
        lastIndex === targetIndex &&
        currentIndex < targetIndex &&
        currentType !== targetType
      ) {
        return true;
      }

      // Check if types match, allowing the move; otherwise, show an alert
      if (currentType === targetType && currPaketInfo === targetPacketInfo) {
        return true;
      } else {
        this.showInvalidMoveAlert();
        return false;
      }
    }

    // Condition 2: Moving backward into a 'pktpos' position from a 'pktpos' is not allowed
    if (
      currentIndex > targetIndex &&
      currentType === 'pktpos' &&
      targetType === 'pos'
    ) {
      this.showInvalidMoveAlert();
      return false;
    }

    // Condition 3: Moving forward into a 'pkt' position or from 'pktpos' to 'pos'
    if (
      (currentIndex < targetIndex && currentType === 'pkt') ||
      (currentType === 'pktpos' && targetType === 'pos')
    ) {
      // Check if types match, allowing the move; otherwise, show an alert
      if (currentType === 'pkt' && targetType === 'pos') {
        return true;
      } else {
        this.showInvalidMoveAlert();
        return false;
      }
    } else {
      // Perform the desired action when the condition is not met

      // Allow the move if types are the same
      if (currentType === targetType) {
        return true;
      }

      // Check if the target position is occupied and has a type other than 'pos'
      if (
        this.indicesWithNonEmptyPaketInfo.includes(target) &&
        targetType !== 'pos'
      ) {
        this.showInvalidMoveAlert();
        return false;
      }

      // If none of the invalid conditions are met, the move is valid
      return true;
    }
  }

  isValidJobMove(
    arr: any[],
    prevIndex: number,
    currentIndex: number,
    item: any
  ): boolean {
    // Check if the move is valid based on some conditions
    // Get indices of 'pktpos' elements
    const pktposIndices = this.getIndices(arr, 'pktpos');
    console.log('Indices of type pktpos:', pktposIndices);

    // Get indices of 'pkt' elements
    const pktIndices = this.getIndices(arr, 'pkt');
    console.log('Indices of type pkt:', pktIndices);

    // Example condition: Check if the move is valid if the item type is 'pos' and there is at least one 'pkt'
    if (item.type === 'pos') {
      console.log('Valid move for pktpos with at least one pkt.');
      return true;
    } else {
      // Add more conditions as needed
      // If no condition is met, consider the move invalid
      this.showInvalidMoveAlert();
      return false;
    }
  }

  // Function to get indices of elements with a specific type
  getIndices(arr: any[], targetType: string): number[] {
    const indices: number[] = [];
    arr.forEach((item: any, index: number) => {
      if (item.type === targetType) {
        indices.push(index);
      }
    });
    return indices;
  }

  // Function to find the last element index
  findLastElementIndex(
    arr: any,
    currentType: string,
    targetParentPaketId: number
  ) {
    // Filter out items where positionId === parentPaketId
    const filteredData = arr.filter(
      (item: any) =>
        item.parentPaketId === targetParentPaketId && item.type === currentType
    );
    // Get the index of the last item in the original array
    const lastIndex = arr.lastIndexOf(filteredData[filteredData.length - 1]);

    // Get the last index of the filtered array
    return lastIndex;
  }

  // // Function to show an alert for an invalid move
  showInvalidMoveAlert() {
    alert(
      'Invalid move: Cannot move inside or between positions with type "pkt" or "pktpos".'
    );
  }

  moveItem(arr: any, currentIndex: number, targetIndex: number) {
    // Check if the move is valid
    if (!this.isValidMove(arr, currentIndex, targetIndex)) {
      return arr; // Return the original array if the move is invalid
    }

    // Perform the move
    const itemToMove = arr.splice(currentIndex, 1)[0];
    arr.splice(targetIndex, 0, itemToMove);

    return arr;
  }
  getIndexValue(arrObj: any) {
    return arrObj
      .filter(
        (item: Position) =>
          item.paketInfo !== '' &&
          item.type !== 'pkt' &&
          item.parentPaketId !== 0
      )
      .map((item: Position) => arrObj.indexOf(item));
  }
}

export interface Position {
  name: string;
  positionId: number;
  parentPaketId: number;
  type: string;
  paketInfo: string;
}

export interface Job {
  jobName: string;
  jobId: number;
  positions?: Position[];
}
/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
