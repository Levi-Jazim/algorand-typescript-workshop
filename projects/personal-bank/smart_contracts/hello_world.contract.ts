import { Contract, Box } from '@algorandfoundation/algokit-utils';


export class HelloWorld extends Contract {
  hello(name: string): string {
    return `Hello, ${name}`;
  }
}

