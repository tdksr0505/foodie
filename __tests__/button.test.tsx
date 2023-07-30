import renderer from 'react-test-renderer';
import Button from '../src/components/Button';

it('Button Component snapshop', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});
