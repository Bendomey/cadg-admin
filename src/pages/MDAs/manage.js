import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { IconButton, Icon } from 'evergreen-ui';
import { getMDAS as GET_MDAS } from '../../graphql/queries';

const ManageMDAs = props => {
  useEffect(() => {
    document.title = 'Manage MDAS | CADG';
  });

  const { loading: loadMDAS, data } = useQuery(GET_MDAS);

  return (
    <>
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Manage MDAs
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
              >
                Add MDA
              </button>
            </span>
          </div>
        </div>
      </div>

      {loadMDAS && (
        <div style={{ height: '50vh' }} className={'flex items-center justify-center'}>
          Loading ...
        </div>
      )}

      {data && data.MDAs.length > 0 && (
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
                        Phone
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Prefix
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data.MDAs.map((mda, i) => (
                      <Fragment key={i}>
                        <tr className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm leading-5 font-medium text-gray-900">
                                  {mda.name ? mda.name : mda.name}
                                </div>
                                <div className="text-sm leading-5 text-gray-500">
                                  {mda.address ? mda.address : 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 font-medium text-gray-900">
                              {mda.email ? mda.email : mda.email}
                            </div>
                            <div className="text-sm leading-5 text-gray-500">{mda.phone ? mda.phone : 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            {mda.prefix ? mda.prefix : 'N/A'}
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            {mda.status ? (
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                                  mda.status === 'active' ? 'green' : 'red'
                                }-100 text-${mda.status === 'active' ? 'green' : 'red'}-800`}
                              >
                                {mda.status}
                              </span>
                            ) : (
                              'N/A'
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                            <div className={'flex flex-row items-center'}>
                              <div className="text-sm leading-5 font-medium text-gray-900">
                                {mda.status === 'deactivate' ? (
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs hover:bg-indigo-50 leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    <Icon icon="cross" color="danger" marginRight={16} />
                                    Deactivate
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs hover:bg-indigo-50 leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    <Icon icon="confirm" color="primary" marginRight={16} />
                                    Activate
                                  </button>
                                )}
                              </div>
                              <div className="text-sm leading-5 text-gray-500 ml-0.5">
                                <Link
                                  to={{
                                    pathname:`/manage/mdas/product/${mda.id}`,
                                    state:{name:mda.name}
                                  }}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs hover:bg-indigo-50 leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                                >
                                  <Icon icon="eye-open" color="primary" marginRight={16} />
                                  View
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default ManageMDAs;
