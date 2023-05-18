import { useContext, useState } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../context/cartContext';
import add from './add.png';
import minus from './minus.png';

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const OptionName = styled.div`
  line-height: 24px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    letter-spacing: 2.8px;

    ${(props) => props.hideOnMobile && 'display: none;'}
  }
`;

const Color = styled.div`
  width: 36px;
  height: 36px;
  padding: 6px;
  border: 6px solid white;
  box-shadow: 0px 0px 1px #bbbbbb;
  cursor: pointer;
  margin-left: 21px;
  background-color: ${(props) => props.$colorCode};
  ${(props) => props.$isSelected && 'outline: 1px solid #979797;'}

  & + & {
    margin-left: 15px;
  }
`;

const Size = styled.div`
  width: 34px;
  height: 34px;
  background-color: ${(props) => (props.$isSelected ? 'black' : '#ececec')};
  color: ${(props) => (props.$isSelected ? 'white' : '#3f3a3a')};
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 22px;
  cursor: ${(props) => (props.$isDisabled ? ' not-allowed' : 'pointer')};
  ${(props) => props.$isDisabled && 'opacity: 0.25;'}

  & + & {
    margin-left: 20px;
  }
`;

const QuantitySelector = styled.div`
  margin-left: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  height: 44px;
  padding: 0 10px;
  border: 1px solid #979797;
  font-size: 20px;

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    width: 100%;
    padding: 0 30px;
  }
`;

const Quantity = styled.div`
  color: #8b572a;
`;

const Button = styled.div`
  cursor: pointer;
  background-size: contain;
  width: 16px;
  height: 16px;
`;

const DecrementButton = styled(Button)`
  background-image: url(${minus});
`;

const IncrementButton = styled(Button)`
  background-image: url(${add});
`;

const AddToCart = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 29px;
  border: solid 1px #979797;
  background-color: black;
  font-size: 20px;
  letter-spacing: 4px;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 1279px) {
    height: 44px;
    margin-top: 10px;
    font-size: 16px;
    letter-spacing: 3.2px;
    color: white;
  }
`;

function ProductVariants({ product }) {
  const [selectedColorCode, setSelectedColorCode] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(0);
  const { cartItems, setCartItems } = useContext(CartContext);

  function getStock(colorCode, size) {
    if (!colorCode || !size) return 0;
    const qty =
      cartItems.find(
        (item) =>
          item.id === product.id &&
          item.color.code === colorCode &&
          item.size === size
      )?.qty || 0;
    return (
      product.variants.find(
        (variant) => variant.color_code === colorCode && variant.size === size
      ).stock - qty
    );
  }

  function addToCart() {
    if (!selectedColorCode) {
      window.alert('請選擇顏色');
      return;
    }
    if (!selectedSize) {
      window.alert('請選擇尺寸');
      return;
    }
    if (quantity === 0) {
      window.alert('請選擇數量');
      return;
    }

    const index = cartItems.findIndex(
      (item) =>
        item.id === product.id &&
        item.color.code === selectedColorCode &&
        item.size === selectedSize
    );
    const newCartItems =
      index !== -1
        ? cartItems.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                qty: item.qty + quantity,
              };
            }
            return item;
          })
        : [
            ...cartItems,
            {
              color: product.colors.find(
                (color) => color.code === selectedColorCode
              ),
              id: product.id,
              image: product.main_image,
              name: product.title,
              price: product.price,
              qty: quantity,
              size: selectedSize,
              stock: getStock(selectedColorCode, selectedSize),
            },
          ];
    setCartItems(newCartItems);
    setSelectedColorCode();
    setSelectedSize();
    setQuantity(0);
    window.alert('已加入商品');
  }

  function addToCartButtonText() {
    if (!selectedColorCode) return '請選擇顏色';
    if (!selectedSize) return '請選擇尺寸';
    if (quantity === 0) return '請選擇數量';
    return '加入購物車';
  }

  return (
    <>
      <Option>
        <OptionName>顏色｜</OptionName>
        {product.colors.map((color) => (
          <Color
            key={color.code}
            $isSelected={color.code === selectedColorCode}
            $colorCode={`#${color.code}`}
            onClick={() => {
              setSelectedColorCode(color.code);
              setSelectedSize();
              setQuantity(0);
            }}
          />
        ))}
      </Option>
      <Option>
        <OptionName>尺寸｜</OptionName>
        {product.sizes.map((size) => {
          const stock = getStock(selectedColorCode, size);
          return (
            <Size
              key={size}
              $isSelected={size === selectedSize}
              $isDisabled={stock === 0}
              onClick={() => {
                if (stock === 0) return;
                setSelectedSize(size);
                setQuantity(0);
              }}
            >
              {size}
            </Size>
          );
        })}
      </Option>
      <Option>
        <OptionName hideOnMobile>數量｜</OptionName>
        <QuantitySelector>
          <DecrementButton
            onClick={() => {
              if (!selectedSize || quantity === 0) return;
              setQuantity(quantity - 1);
            }}
          />
          <Quantity>{quantity}</Quantity>
          <IncrementButton
            onClick={() => {
              const stock = getStock(selectedColorCode, selectedSize);
              if (!selectedSize || quantity === stock) return;
              setQuantity(quantity + 1);
            }}
          />
        </QuantitySelector>
      </Option>
      <AddToCart onClick={addToCart}>{addToCartButtonText()}</AddToCart>
    </>
  );
}

export default ProductVariants;
