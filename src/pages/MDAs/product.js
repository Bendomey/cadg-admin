import React, { useEffect, Fragment, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { productForMDA as PRODUCT_MDA } from '../../graphql/queries';
import { Dialog, Button } from 'evergreen-ui';

const MDAProduct = props => {
  const { location, push } = useHistory();
  const { id } = useParams();
  const [productData, setData] = useState(null);
  const [isShown, setIsShown] = useState(false);

  const { loading, data } = useQuery(PRODUCT_MDA, {
    variables: {
      id,
    },
  });
  useEffect(() => {
    if (location.state?.name === undefined) return push('/manage/mdas');
    document.title = `${location.state.name} | CADG`;
    console.log(id);
  });
  return (
    <>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{location.state?.name}</h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
              >
                Add Product
              </button>
            </span>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ height: '50vh' }} className={'flex items-center justify-center'}>
          Loading ...
        </div>
      )}

      {data && data.products.length > 0 && (
        <Fragment>
          <div className="flex flex-col">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Short Code
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Bundle Size
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Minimum Order Count
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data.products.map((product, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm leading-5 font-medium text-gray-900">
                                {product.name ? product.name : 'N/A'}
                              </div>
                              <div className="text-sm leading-5 text-gray-500">
                                {product.type ? product.type : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {product.shortCode ? product.shortCode : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          {product.unitPrice ? product.unitPrice : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {product.bundleSize ? product.bundleSize : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {product.minOrderCount ? product.minOrderCount : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                          <Button
                            onClick={() => {
                              setData(product);
                              setIsShown(!isShown);
                            }}
                            appearance="minimal"
                            intent="primary"
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      )}

      {data && data.products.length === 0 && (
        <div tyle={{ height: '50vh' }} className={'flex items-center justify-center'}>
          No Data here
        </div>
      )}

      <Dialog
        isShown={isShown}
        title={productData?.name}
        onCloseComplete={() => setIsShown(!isShown)}
        confirmLabel="Custom Label"
        hasFooter={false}
        hasHeader={false}
        width={700}
      >
        <div className="bg-white overflow-hidden  sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{productData?.name}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">{location.state.name}</p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm leading-5 font-medium text-gray-500">Product Type</dt>
                <input
                  id="email"
                  value={productData?.type}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="Type"
                />
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm leading-5 font-medium text-gray-500">Short Code</dt>
                <input
                  id="email"
                  value={productData?.shortCode}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="Short Code"
                />
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm leading-5 font-medium text-gray-500">Unit Price</dt>
                <input
                  id="email"
                  value={productData?.unitPrice}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="Unit Price"
                />
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm leading-5 font-medium text-gray-500">Bundle Size</dt>
                <input
                  id="email"
                  value={productData?.bundleSize}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="Bundle Size"
                />
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm leading-5 font-medium text-gray-500">Minimum Order Count</dt>
                <input
                  id="email"
                  value={productData?.minOrderCount}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="Minimum Order Count"
                />
              </div>
            </dl>
            <span className="inline-flex rounded-md shadow-sm mt-3 right-1">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                Update
              </button>
            </span>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MDAProduct;
