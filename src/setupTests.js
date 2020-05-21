import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';
import 'jest-localstorage-mock';
import 'jest-canvas-mock';

Enzyme.configure({ adapter: new Adapter() });
