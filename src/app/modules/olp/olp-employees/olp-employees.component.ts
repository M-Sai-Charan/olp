import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-olp-employees',
  templateUrl: './olp-employees.component.html',
  styleUrl: './olp-employees.component.css',
  standalone: false
})
export class OlpEmployeesComponent {
  selectedNodes!: TreeNode[];
  data: TreeNode[] = [
    {
      expanded: true,
      type: 'person',
      data: {
        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO'
      },
      children: [
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CMO'
          },
          children: [
            {
              type: 'person',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                name: 'Anna Fali',
                title: 'CMO'
              },
            },
            {
              type: 'person',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                name: 'Anna Fali',
                title: 'CMO'
              },
            }
          ]
        },
        {
          expanded: true,
          type: 'person',
          data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
            name: 'Anna Fali',
            title: 'CMO'
          },
          children: [
            {
              type: 'person',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                name: 'Anna Fali',
                title: 'CMO'
              },
            },
            {
              type: 'person',
              data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                name: 'Anna Fali',
                title: 'CMO'
              },
            }
          ]
        }
      ]
    }
  ];
}
